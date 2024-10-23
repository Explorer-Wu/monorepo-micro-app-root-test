import html2Canvas from 'html2canvas';
import JsPDF from 'jspdf';

/**
 * @param  ele          要生成 pdf 的DOM元素（容器）
 * @param  padfName     PDF文件生成后的文件名字
 * */
export function exportLoadPDF(ele = '', pdfName = '') {
  return new Promise((reslove, reject) => {
    // 第一个参数是需要生成截图的元素, 第二个是自己需要配置的参数,宽高等
    window.pageYoffset = 0;
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const exportDom = document.getElementById(ele);
    const pdfTimeOut = setTimeout(() => {

      html2Canvas(exportDom, {
      // dpi: 300,
        useCORS: true, // 开启跨域配置, 允许canvas画布内 可以跨域请求外部链接图片, 允许跨域请求。
        allowTaint: true, // 允许跨域图片
        // backgroundColor: '#f5f5f5',
        scale: window.devicePixelRatio < 3 ? window.devicePixelRatio : 2, // 设置放大的倍数,处理模糊问题
      // elOffsetWd,
      // elOffsetHt,
      // scrollY: 0,
      // scrollX: 0,
      // windowHeight: ele.scrollHeight,
      }).then(canvas => {
      //返回图片dataURL，参数：图片格式和清晰度(0-1)
        let pageData = canvas.toDataURL('image/jpeg', 1.0);
        // let pageData = canvans.toDataURL('image/png');
        // let dataURL = pageData.replace('data:image/png;base64,', '');
        // let saveImageData = {
        //   type:'61', //协议Type值
        //   imageData: dataURL//保存图片的地址
        // };

        let dims = {
          a2: [1190.55, 1683.78],
          a3: [841.89, 1190.55],
          a4: [595.28, 841.89]
        };
        //方向默认竖直，尺寸ponits，格式a2
        let pdf = new JsPDF('', 'pt', 'a4');

        let a4Width = dims['a4'][0];
        let a4Height = dims['a4'][1];

        let contentWidth = canvas.width;
        let contentHeight = canvas.height;

        // 一页pdf显示html页面生成的canvas高度;
        let pageHeight = (contentWidth / a4Width) * a4Height;
        // 未生成pdf的html页面高度
        let leftHeight = contentHeight;

        // 页面偏移
        let position = 0;
        // a4纸的尺寸[595.28, 841.89]，html页面生成的canvas在pdf中图片的宽高
        let imgWidth = a4Width;
        let imgHeight = (a4Width / contentWidth) * contentHeight;

        //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
        //当内容未超过pdf一页显示的范围，无需分页
        if (leftHeight < pageHeight) {
        // 在pdf.addImage(pageData, 'JPEG', 左，上，宽度，高度)设置在pdf中显示；
        // addImage后两个参数控制添加图片的尺寸，此处将页面高度按照a4纸宽高比列进行压缩
          pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
        } else { // 分页
          while (leftHeight > 0) {
            pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
            leftHeight -= pageHeight;
            position -= a4Height;
            //避免添加空白页
            if (leftHeight > 0) {
              pdf.addPage();
            }
          }
        }
        //可动态生成
        pdf.save(pdfName);
        // resolve(pdfName);
        reslove('导出成功');
      })
        .catch(() => {
        // eslint-disable-next-line prefer-promise-reject-errors
          reject('导出PDF失败，请稍后重试');
        });

      clearTimeout(pdfTimeOut);
    }, 300); // 这里加上 300ms 的延迟是为了让 DOM 元素完全渲染完成后再进行图片的生成
  });
}

// eslint-disable-next-line import/prefer-default-export
export const exportLoadFile = (res) => {
  const blob = new Blob([res.data]);
  // 兼容不同浏览器的URL对象
  const url = window.URL || window.webkitURL || window.moxURL;
  const downloadHref = url.createObjectURL(blob);
  // 创建a标签并为其添加属性
  let downloadLink = document.createElement('a');
  downloadLink.href = downloadHref;
  downloadLink.download = decodeURIComponent(res.headers['content-disposition']).split('=')[1];
  //.slice(21).replace(/\+/g, ' ');
  // 触发点击事件执行下载
  downloadLink.click();
  url.revokeObjectURL(downloadHref);
};