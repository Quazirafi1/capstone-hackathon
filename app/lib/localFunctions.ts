export function contains(list: any[], elem: any){
    for(var i =0 ; i<list.length;i++){
        const e = list[i]
        console.log(e.toString(), elem.toString())
        
        if(e.toString() == (elem.toString()) ){
            console.log('eq')
            return true;
        }
    }
    return false;
  }