/*
 * @Author: lxj 1851816672@qq.com
 * @Date: 2024-04-23 02:18:59
 * @LastEditors: lxj 1851816672@qq.com
 * @LastEditTime: 2024-04-24 05:37:22
 * @FilePath: /script/create_gmail_script/create_gmail.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({ headless: false }); // 可以选择有头模式以便观察执行过程
    const page = await browser.newPage();
    await page.goto('https://signup.live.com/signup');
    // 填写注册表单
    await page.waitForSelector('input[name="MemberName"]');
    // 读取文本文件内容
    fs.readFile('gmail.txt', 'utf8', async (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        // 按行分割文本内容
        const lines = data.split('\n');

        let infor = lines[0].split(',')
        let firstName = infor[0]
        let lastName = infor[1]
        let password = infor[2]
        let birthYear = infor[3]
        let birthMonth = infor[4]
        let birthDay = infor[5]
        // 填写邮箱
        await page.type('input[name="MemberName"]', firstName + lastName + birthYear + birthMonth + birthDay + '@outlook.com', { delay: 100 });
        // 点击下一步按钮
        await page.click('#iSignupAction');
        // 等待密码输入框加载完成
        await page.waitForSelector('input[name="Password"]');
        //输入密码
        await page.type('input[name="Password"]', password);
        // 点击下一步按钮
        await page.click('#iSignupAction');
        // 等待密码输入框加载完成
        await page.waitForSelector('input[name="LastName"]');
        await page.type('input[name="FirstName"]', firstName, { delay: 100 });
        await page.type('input[name="LastName"]', lastName, { delay: 100 });
        // 点击下一步按钮
        await page.click('#iSignupAction');
        await page.waitForSelector('select[name="BirthMonth"]');
        await page.waitForSelector('input[name="BirthYear"]');
        await page.waitForSelector('select[name="BirthDay"]');
        await page.type('input[name="BirthYear"]', birthYear);
        await page.select('select[name="BirthMonth"]', birthMonth);
        await page.select('select[name="BirthDay"]', birthDay);
        // 点击下一步按钮
        await page.click('#iSignupAction');

        // // 填写其他信息，这里需要根据具体的页面交互来确定操作步骤
        // // 例如，选择性别、输入手机号码等

        // // 提交注册表单
        await page.waitForNavigation(); // 等待页面跳转
        console.log('Registration completed successfully!');

        await browser.close();
        console.log(infor, firstName, lasttName, password);
        // lines.forEach(async (item, index) => {

        // })
    });

})();
