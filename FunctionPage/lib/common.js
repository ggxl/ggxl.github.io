/**
 * RGB转十六进制
 举例说明,例1:rgb(11,111,222)=#??????
 11÷16=0余11   11对应B  前面补0  那么HEX的数据为0B
 111÷16=6余15  15对应F  那么HEX的数据为6F
 222÷16=13余14  13对应D  14对应E   那么HEX的数据为DE
 合起来HEX的数据就为#0B6FDE
 **/
function RGB2HEX(R,G,B) {
    if(arguments.length!=3){
        return alert("参数个数有误!");
    }
    hexcode = "#";
    for (x = 0; x < 3; x++) {
        var v = arguments[x];
        if (v == "")
            v = "0";
        if (parseInt(v) != v)
            return alert("请输入数字！");
        if (v > 255)
            return alert("数字在0-255之间！");
        var hexstr = "0123456789ABCDEF", H16 = v/16, L16 = v% 16;
        hexcode += hexstr.substr(H16, 1) + hexstr.substr(L16, 1);
    }
    return hexcode;
}
/**
 * 十六进制转RGB
 和上面的思路相反
 两个字符 一组
 第一个字符*16的值+第二个字符的值
 **/
function HEX2RGB(HEX) {
    if (HEX.substr(0, 1) == "#")
        HEX = HEX.substring(1);
    if (HEX.length != 6)
        return alert("请输入正确的十六进制颜色码！");

    HEX = HEX.toLowerCase();
    var hexstr = "0123456789abcdef";
    b = new Array();
    var HL16,H16,L16,RGBstr=[];

    for (x = 0; x < 3; x++) {
        HL16 = HEX.substr(x * 2, 2);

        H16 = HL16.substr(0, 1);
        L16 = HL16.substr(1, 1);
        RGBstr[RGBstr.length]=hexstr.indexOf(H16) * 16 + hexstr.indexOf(L16);
    }
    return RGBstr;
}