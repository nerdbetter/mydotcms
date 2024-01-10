import Link from "next/link";

// not the way to handle AUTH in a production ENV
// would extract authentication to NextAuth if time permits
const getToken = async () => {
  const res = await fetch(
    "https://demo.dotcms.com/api/v1/authentication/api-token",
    {
      method: "POST",
      body: JSON.stringify({ user: "admin@dotcms.com", password: "admin" }),
      headers: { "Content-Type": "application/json" },
    }
  );
  const tokenData = await res.json();
  return tokenData.entity.token;
};

const getNav = async (token) => {
  const res = await fetch("https://demo.dotcms.com/api/v1/nav/?depth=3", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const navRes = await res.json();
  return navRes.entity.children;
};

const RenderNav = async () => {
  const tokenData = await getToken();
  const navData = await getNav(tokenData);

  // would like to add active styling for better User Experience
  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <ul className="flex">
      {navData.map((c) => {
        return (<li key={c.title} className="mr-6">
          <Link href={c.href} className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
            {c.title}
          </Link>
        </li>);
      })}
    </ul>

    </nav>
  );
};

export default RenderNav;