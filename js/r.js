export function r(x,y,n) {
    let f=1;
    var cD=0,cols=1;
    for(;cols<20;cols++){
        if(cols>=3&&f){n=n+1;f=0;}
        let xd=x/cols;
        let yc=Math.ceil(n/cols);
        let yd=y/yc;
        // console.log(xd,yd);
        let cd=Math.min(xd,yd);
        if(cd<cD) break;
        else cD=cd;
    }

    // console.log(x,y,n,cD,cols);
    return [cD/2,--cols];
}