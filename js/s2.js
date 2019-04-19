import {attributeF} from './attributeF.js';
import {set_op} from "./set_op.js";
var new_selection=[];
var clicked=[];
function s2(s3,selection,s,type){
    // console.log("更新keywords面版");
    // console.log("当前keywords数据集为：",selection);
    let map_s2={};
    let keywords2data={};
    for(let paper_i in selection){
        let ii=s.indexOf(selection[paper_i]);
        let keywords = selection[paper_i]["Author Keywords"];
        if(keywords!=undefined){
            let keyword_arr=keywords.split(',');
            for(let i in keyword_arr){
                let key_arr = keyword_arr[i].split(";");
                for(let j in key_arr){
                    let keyword = key_arr[j].toLocaleLowerCase().replace(/(^\s*)|(\s*$)/g, "").replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
                    if(keyword!="") {
                        map_s2[keyword] == undefined ? map_s2[keyword] = 1 : map_s2[keyword] += 1;
                        keywords2data[keyword] == undefined ? keywords2data[keyword] = [ii] : keywords2data[keyword].push(ii);
                    }
                }
            }
        }

    }
    // console.log(JSON.stringify(keywords2data));
    // console.log("keywords面板映射",map_s2);
    // console.log("keywords与文章映射对象",keywords2data);
    let data=[];
    for(var i in map_s2){
        let tmp= {};
        tmp['name'] = i;
        tmp['num'] = map_s2[i];
        data.push(tmp);
    }
    data.sort((a,b)=>b.num-a.num);
    // console.log("venues数组",data);
    $('.keyword-body').children('*').remove();
    var div=d3.select('.keyword-body').selectAll('div').data(data).enter()
        .append('div').attr("class",function(d){if(clicked.indexOf(d.name)!=-1) { $(this).css('background', '#98dafc'); d.click=1; }return "text-box";})
        .on('click',function(d){
            if(d.click!=1){
                clicked.push(d.name);
                $(this).css('background', '#98dafc');
                let k=1;
                console.log("--->",new_selection)
                for(var j in keywords2data[d.name]){
                    for(var i in new_selection){
                        if(new_selection[i]===keywords2data[d.name][j])k=0;
                    }
                    if(k)new_selection.push(keywords2data[d.name][j]);
                }
                d.click=1;

            }else {
                var index = clicked.indexOf(d.name);
                if (index > -1) {
                    clicked.splice(index, 1);
                }
                d.click=0;
                $(this).css('background', '');
                // new_selection.filter(function(value,index,arr){
                //     return arr.indexOf(value,index+1) === -1
                // })
                var ans1=[];
                var ans2=[];
                console.log(1,new_selection,K2P[d.name]);
                for(var i in new_selection) {
                    let k=1;
                    for(var j in K2P[d.name]){
                        if(new_selection[i]==K2P[d.name][j])k=0;
                    }
                    if(k)ans1.push(new_selection[i]);
                    // else ans2.push(new_selection[i]);
                }
                new_selection=ans1;

            }


            s3[2] = new_selection.map(function(item,index,array){
                return s[item];
            });
            var ans = set_op(s3,s);

            if(ans.length==s.length)  attributeF([[],[],[]],s,s,-1);
            console.log(2,ans,s3,s);

            attributeF(s3,ans,s,2);
        });
    div.append('span').text(d=>d.name).attr('class', 'text-style');
    div.append('span').text(d=>d.num).attr('class', 'num-style');
}
export {s2};