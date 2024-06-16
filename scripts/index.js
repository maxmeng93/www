const fs = require("fs");
const path = require("path");

function convertData(code) {
  // 读取原始JSON文件
  const inputFilePath = path.join(`./data/index_zh_a_hist/${code}.json`);
  const outputFilePath = path.join(
    `./data/index_zh_a_hist/converted_${code}.json`
  );

  // 读取JSON文件
  fs.readFile(inputFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("读取文件失败:", err);
      return;
    }

    try {
      // 解析JSON数据
      const jsonData = JSON.parse(data);

      // 转换数据格式
      // 日期,开盘,收盘,最高,最低,成交量,成交额,振幅,涨跌幅,涨跌额,换手率
      const convertedData = jsonData.map(
        (item) =>
          `${item.日期},${item.开盘},${item.收盘},${item.最高},${item.最低},${item.成交量},${item.成交额},${item.振幅},${item.涨跌幅},${item.涨跌额},${item.换手率}`
      );

      // 将转换后的数据写入新的JSON文件
      fs.writeFile(
        outputFilePath,
        JSON.stringify(convertedData, null, 2),
        "utf8",
        (err) => {
          if (err) {
            console.error("写入文件失败:", err);
            return;
          }
          console.log("数据转换并保存成功");
        }
      );
    } catch (err) {
      console.error("解析JSON数据失败:", err);
    }
  });
}

const getData = (code) => {
  const url =
    "http://aktools.maxmeng.top/api/public/index_zh_a_hist?symbol=" + code;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // 原始数据
      const inputFilePath = path.join(`./data/index_zh_a_hist/${code}.json`);
      fs.writeFile(
        inputFilePath,
        JSON.stringify(data, null, 0),
        "utf8",
        (err) => {
          if (err) {
            console.error("写入文件失败:", err);
            return;
          }
          console.log(`原始数据写入成功: ${code}`);
        }
      );

      // 转换后数据
      const outputFilePath = path.join(
        `./data/index_zh_a_hist/converted_${code}.json`
      );
      const convertedData = data.map(
        (item) =>
          `${item.日期},${item.开盘},${item.收盘},${item.最高},${item.最低},${item.成交量},${item.成交额},${item.振幅},${item.涨跌幅},${item.涨跌额},${item.换手率}`
      );

      // 将转换后的数据写入新的JSON文件
      fs.writeFile(
        outputFilePath,
        JSON.stringify(convertedData, null, 0),
        "utf8",
        (err) => {
          if (err) {
            console.error("写入文件失败:", err);
            return;
          }
          console.log(`数据转换并保存成功: ${code}`);
        }
      );
    });
};

const list = ["000001", "399006", "000300"];
list.forEach((code) => {
  // convertData(code);
  getData(code);
});
