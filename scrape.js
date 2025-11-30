const fs = require('fs');
const axios = require('axios');
const os = require('os');
const chalk = require('chalk');

const file = 'proxy.txt';

const urls = [
    'https://raw.githubusercontent.com/ErcinDedeoglu/proxies/main/proxies/socks4.txt',
    'https://raw.githubusercontent.com/ErcinDedeoglu/proxies/main/proxies/http.txt',
    'https://raw.githubusercontent.com/ErcinDedeoglu/proxies/main/proxies/https.txt',
    'https://raw.githubusercontent.com/ErcinDedeoglu/proxies/main/proxies/socks5.txt',
    'https://raw.githubusercontent.com/roosterkid/openproxylist/main/HTTPS_RAW.txt',
    'https://raw.githubusercontent.com/vakhov/fresh-proxy-list/master/https.txt',
    'https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/socks5.txt',
    'https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/http.txt',
    'https://raw.githubusercontent.com/MuRongPIG/Proxy-Master/main/http.txt',
    'https://raw.githubusercontent.com/officialputuid/KangProxy/KangProxy/http/http.txt',
    'https://raw.githubusercontent.com/prxchk/proxy-list/main/http.txt',
    'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/http.txt',
    'https://raw.githubusercontent.com/proxylist-to/proxy-list/main/http.txt',
    'https://raw.githubusercontent.com/yuceltoluyag/GoodProxy/main/raw.txt',
    'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/http.txt',
    'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/https.txt',
    'https://raw.githubusercontent.com/mmpx12/proxy-list/master/https.txt',
    'https://api.proxyscrape.com/?request=displayproxies&proxytype=http',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=all',
    'https://www.proxydocker.com/en/proxylist/download?email=noshare&country=all&city=all&port=all&type=all&anonymity=all&state=all&need=all',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=anonymous',
    'https://raw.githubusercontent.com/vakhov/fresh-proxy-list/master/socks5.txt',
    'https://spys.one/free-proxy-list/',
    'https://www.proxy-list.download/api/v1/get?type=http&anon=elite&country=US',
    'https://www.proxy-list.download/api/v1/get?type=http&anon=transparent&country=US',
];

const clearTerminal = () => {
    process.stdout.write(os.platform() === 'win32' ? '\x1Bc' : '\x1B[2J\x1B[0f');
};

(async () => {
    try {
        clearTerminal();

        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
            console.log(chalk.red(`File ${file} removed.`));
        }

        const stream = fs.createWriteStream(file, { flags: 'a' });

        for (const url of urls) {
            try {
                const response = await axios.get(url);
                stream.write(response.data + '\n');
                console.log(` -| ${chalk.green('Downloading proxy from')} ${url}`);
            } catch (error) {
                console.log(` -| ${chalk.red('Failed to fetch')} ${url}`);
            }
        }

        stream.end(() => {
            const lines = fs.readFileSync(file, 'utf-8').split('\n').filter(Boolean);
            console.log(`\n${chalk.white('(')} ${chalk.yellow(lines.length)} ${chalk.white(')')} ${chalk.green('Proxy list created successfully.')}`);
        });

    } catch (err) {
        console.error(chalk.red('Unexpected error:'), err);
        process.exit(1);
    }
})();
