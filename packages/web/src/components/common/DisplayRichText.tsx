import parse from 'html-react-parser';
import styled from 'styled-components';
import { client } from '@frontend/shared/graphql';
import { useRouter } from 'next/router';
import { GET_LIST_ITEM_BY_ID } from '@frontend/shared/graphql/query/list';

type IProps = {
  value: string;
};

const StyledDiv = styled.div`
  .iframe-container {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
    iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
`;

export default function DisplayRichText({ value = 'dd' }: IProps) {
  const router = useRouter();
  const getData = async (id) => {
    const listItem = await getListItem(id);
    router.push(`/page/${listItem['data'].getListItem.slug}`);
  };
  return (
    <StyledDiv className="ck-content">
      {parse(transform(value), {
        replace: (domNode: any) => {
          if (domNode.name == 'a' && domNode.attribs.class == 'mention') {
            return (
              <div
                style={{ cursor: 'pointer', color: 'blue' }}
                onClick={() => {
                  getData(domNode.attribs['data-user-id']);
                }}
              >
                {console.log(domNode)}
                {domNode.attribs['data-mention']}
              </div>
            );
          }
        },
      })}
    </StyledDiv>
  );
}

export async function getListItem(_id) {
  try {
    const response = await client.query({
      query: GET_LIST_ITEM_BY_ID,
      variables: { _id: _id },
    });
    return new Promise((resolve) => {
      resolve(response);
    });
  } catch (e) {
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
