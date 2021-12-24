import parse from 'html-react-parser';
import styled from 'styled-components';

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
  return <StyledDiv className="ck-content">{parse(transform(value))}</StyledDiv>;
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
