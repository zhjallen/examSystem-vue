const states = {
  development: "http://file.dev.zjjc.com",
  production: "http://file.zhujianjc.com:81",
  test: "http://file.dev.zjjc.com",
  // "stg": "https://file.mklmall.com",
}
const env = process.env.NODE_ENV;
export  const  envConfig = {
  downloadPrivateFile: states[env] + "/file/private/download",
}