"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
const DynamicPost = () => {

  const pathName = usePathname();

  const [postRender, setPostRender] = useState()

  useEffect(()=>{
    const getBlogPost = async () => {
        const res = await fetch(
          `https://demo.dotcms.com/api/v1/page/render${pathName}`,
          {
            headers: {
              Authorization: `Basic ${btoa("admin@dotcms.com:admin")}`,
            },
          }
        );
        const blogRes = await res.json();
        const renderedPage = blogRes.entity.page.rendered;
        setPostRender(renderedPage)
        console.log(blogRes.entity.page.rendered);
      };
      getBlogPost();
  },[])

//   const RenderBlog = async () => {
//     const blogPage = await getBlogPage();

//     console.log(`BLOG DATA: ${blogPage}`);
console.log(postRender)
    return (
     <div
         className="blogpage"
         dangerouslySetInnerHTML={{ __html: postRender }}
       ></div>
     );
};
export default DynamicPost;
