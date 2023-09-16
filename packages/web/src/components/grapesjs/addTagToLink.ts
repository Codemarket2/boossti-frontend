export const addTagToLink = (html: string): string => {
  let newHtml = html;
  const hrefs = newHtml.match(/href="([^"]*)/g);
  hrefs?.forEach((href, index) => {
    const tag = `link${index + 1}`;
    newHtml = newHtml.split(href).join(`ses:tags="count:${tag};" ${href}`);
  });
  return newHtml;
};
