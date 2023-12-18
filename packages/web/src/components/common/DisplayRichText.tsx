import parse from 'html-react-parser';
import { styled } from '@mui/material/styles';
import { client } from '@frontend/shared/graphql';
import { useRouter } from 'next/router';
import { GET_PAGE_BY_ID } from '@frontend/shared/graphql/query/template';

type IProps = {
  value: string;
};

const StyledDiv = styled('div')(({ theme }) => ({
  inlineSize: '100%',
  overflowWrap: 'break-word',
  '& .iframe-container': {
    position: 'relative',
    paddingBottom: '56.25%',
    height: 0,
    overflow: 'hidden',
  },
  '& iframe': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  '& img': {
    maxWidth: '100%',
  },
}));

export default function DisplayRichText({ value = '' }: IProps) {
  const router = useRouter();
  const getData = async (id) => {
    const page: any = await getPage(id);
    router.push(`/page/${page?.data?.getPage?.slug}`);
  };
  return (
    <StyledDiv className="ck-content">
      {parse(transform(value), {
        replace: (domNode: any) => {
          if (domNode.name === 'a' && domNode.attribs.class === 'mention') {
            return (
              <span
                style={{ cursor: 'pointer', color: 'blue' }}
                onClick={() => {
                  if (domNode.attribs['data-type'] === 'listitem') {
                    getData(domNode.attribs['data-id']);
                  } else {
                    router.push(`/user/${domNode.attribs['data-id']}`);
                  }
                }}
              >
                {domNode.attribs['data-mention']}
              </span>
            );
          }
        },
      })}
    </StyledDiv>
  );
}

export async function getPage(_id) {
  try {
    const response = await client.query({
      query: GET_PAGE_BY_ID,
      variables: { _id },
    });
    return new Promise((resolve) => {
      resolve(response);
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
}

const transform = (htmlContent: any) => {
  const oembed = htmlContent.split('</oembed>');
  let body = '';
  oembed.forEach((item, index) => {
    body += `${oembed[index]}</oembed>`;
    const oembed1 = item.split('url="')[1];
    if (oembed1) {
      const oembed2 = oembed1.split('">')[0];
      if (oembed2) {
        const youtube = oembed2.split('https://www.youtube.com/watch?v=')[1];
        if (youtube) {
          body += `<div class="iframe-container"><iframe src="https://youtube.com/embed/${youtube}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
        }
      }
    }
  });
  return body;
};
