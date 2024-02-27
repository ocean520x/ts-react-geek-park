export {}
const path=require('path')
const pxToViewPort = require('postcss-px-to-viewport')
const vw=pxToViewPort({
    viewportWidth:375
})
module.exports= {
    webpack:{
        alias:{
            '@':path.resolve(__dirname,'src/')
        }
    },
    style:{
        postcss:{
            mode:"extends",
            loaderOptions:{
                postcssOptions:{
                    ident:"postcss",
                    plugins:[vw]
                }
            }
        }
    }
}