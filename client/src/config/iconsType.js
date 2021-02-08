import icons from "./icon"
let typeMap=new Map();
for(let key  in icons){
    icons[key].forEach((value)=>{
      typeMap.set(value.detail,value.icon);
    })
}
export default typeMap;