const formatToJSON = (desc, splitChar = "\n") => {
    console.log("Desc = ", desc);
    let datas = desc.split(splitChar);

    let ans = {};
    for (let data of datas) {
        let pos = data.indexOf(':');
        let key = data.substr(0, pos); key = key.trim();
        let value = data.slice(pos + 1); value = value.trim();
        ans[key] = value;
    }

    console.log("Ans = ", ans);

    return JSON.stringify(ans);
};

// console.log(formatToJSON("CPU: Intel Core i3-8130U ( 2.2 GHz - 3.4 GHz / 4MB / 2 nhân, 4 luồng ) i3-8130U\nOCung: 1TB HDD 5400RPM\nRAM: 1 x 4GB  DDR4  2666MHz ( 2 Khe cắm / Hỗ trợ tối đa 16GB )\nCard: Onboard  Intel UHD Graphics 620\nManHinh: 15.6 ( 1920 x 1080 ) Full HD  IPS  không cảm ứng , HD webcam\nHDH: Windows 10 Home SL 64-bit  Windows 10\nKT&KL: 34 x 23 x 1.8 cm ,  1.6 kg"))

module.exports = formatToJSON;