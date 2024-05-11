const nodemailer = require('nodemailer') //引入模块
//创建一个smtp的服务器，对邮箱进行配置
const config = {
  host: 'smtp.qq.com', //邮箱服务的主机
  //qq邮箱对应的pop3和smtp服务器地址分别为pop.qq.com  smtp.qq.com
  port: 465, //对应的端口号
  //QQ邮箱对应的pop3和smtp服务器的端口号分别为995   465或587
  auth: {
    user: '注册邮箱号', //注册的邮箱账号
    pass: '邮箱的授权码', //邮箱的授权码，当你开通QQ邮箱smtp服务时，会发送给你一个码，这个码是你自己独有的
  },
}
//创建一个SMPT客户端对象
const transporter = nodemailer.createTransport(config)

//发送邮件
module.exports = function nodemail(mail) {
  //mail 为要发送的的qq邮箱
  transporter.sendMail(mail, function (error, info) {
    if (error) {
      //若发送邮箱有错误，就把错误打印出来
      return console.log(error)
    }
    console.log('mail sent:', info.response) //info为发送邮件的基本信息
  })
}
