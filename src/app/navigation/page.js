import Link from 'next/link'

const getToken = async () => {
  const res = await fetch("https://demo.dotcms.com/api/v1/authentication/api-token", {
      method: 'POST',
      body: JSON.stringify({"user":"admin@dotcms.com", "password":"admin"}),
      headers: { "Content-Type": "application/json" }
    })
    const tokenData = await res.json();
    console.log(tokenData)
    return tokenData.entity.token

}

const getNav = async (token) => {
  const res = await fetch("https://demo.dotcms.com/api/v1/nav/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const navRes = await res.text();
  return navRes
}

const renderNav = async () => {
  const tokenData = await getToken();
  const navData = await getNav(tokenData);
  
  console.log(`TOKEN DATA: ${tokenData}`, `NAV DATA: ${navData}`)

  return (
    <div className="navDiv"></div>
  ); 
}
export default renderNav