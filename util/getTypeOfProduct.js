const selector = [/laptop/i, /ram/i, /ổ cứng/i, /màn hình/i, /chuột/i, /mouse/i, /bàn phím/i, /ssd/i, /hdd/i, /ddr/i];
const ProductCategory = ["laptop", "ram", "ổ cứng", "màn hình", "chuột", "chuột", "bàn phím", "ổ cứng", "ổ cứng", "ram"];

const getTypeOfProduct = (name) => {
    let position = [];

    for (let id in ProductCategory) {
        position[id] = name.search(selector[id]);
        if (position[id] == -1) position[id] = name.length + 1;
    }

    let minn = name.length + 1;
    let ans = null;

    for (let id in position) {
        if (position[id] < minn) {
            minn = position[id];
            ans = ProductCategory[id];
        }
    }

    return ans;
}

// console.log(
//     getTypeOfProduct('DDR4 bàn phím laptop Asus TUF Gaming FX506LHB-HN188W i5 10300H'))