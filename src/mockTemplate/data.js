import Mock from 'mockjs';

// GET请求
Mock.mock('/api/getData', 'get', () => {
  return Mock.mock({
    'data|10': [
      {
        'name': '@cname',
        'age|20-30': 1,
        'id|+1': 1
      }
    ]
  });
});

// POST请求
Mock.mock('/api/postData', 'post', (options) => {
  const { body } = options;
  return Mock.mock({
    'data': `hello, ${JSON.parse(body).name}!`
  });
});
