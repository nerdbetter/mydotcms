const getBlogPage = async () => {
  const res = await fetch(
    "https://demo.dotcms.com/api/v1/page/render/blog/index",
    {
      headers: {
        Authorization: `Basic ${btoa("admin@dotcms.com:admin")}`,
      },
    }
  );
  const blogRes = await res.json();
  const renderedPage = blogRes.entity.page.rendered;
  console.log(blogRes.entity.page.rendered);
  return renderedPage;
};

const RenderBlog = async () => {
  const blogPage = await getBlogPage();

  console.log(`BLOG DATA: ${blogPage}`);

  return (
    <div
      className="blogpage"
      dangerouslySetInnerHTML={{ __html: blogPage }}
    ></div>
  );
};

export default RenderBlog;
