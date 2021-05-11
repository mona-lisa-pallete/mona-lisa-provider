const getApiHost = () => {
  const host: { [key: string]: string } = {
    'localhost:9999': '',
    'portalhome.uae.shensz.local': 'http://portalhome.uae.shensz.local',
    'testportalhome.uae.shensz.local': 'http://testportalhome.uae.shensz.local',
    'portal.test.guorou.net': 'http://portal.test.guorou.net',
    'portal.guorou.net': 'https://portal.guorou.net',
  };
  return host;
};

const getApi = () => {
  const data = getApiHost();
  const { host } = window.location;
  return data[host];
};

export { getApi };
