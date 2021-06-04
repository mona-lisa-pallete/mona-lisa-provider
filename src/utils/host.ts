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

const getDllHost = () => {
  const host: { [key: string]: string } = {
    'localhost:9999': 'http://127.0.0.1:22111/',
    'portalhome.uae.shensz.local': 'http://static.guorou.net/davinci/lib',
    'testportalhome.uae.shensz.local': 'http://static.guorou.net/davinci/lib',
    'portal.test.guorou.net': 'http://static.guorou.net/davinci/lib',
    'portal.guorou.net': 'http://static.guorou.net/davinci/lib',
  };
  return host;
};

const getDllApi = () => {
  const data = getDllHost();
  const { host } = window.location;
  return data[host];
};

const getActionDllApi = () => {
  return 'http://127.0.0.1:22111';
};

export { getApi, getDllApi, getActionDllApi };
