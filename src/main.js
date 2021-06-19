const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    { logo: 'A', url: 'https://www.acfun.cn' }
    , { logo: 'B', url: 'https://www.bilibili.com' }
]
const removeHttp = (url) => {
    return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '')
}

const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`
    <li>
        <div class="site">
            <div class="logo">
                ${removeHttp(node.url)[0]}
            </div>
            <div class="link">${removeHttp(node.url)}</div>
            <div class="close">
            <svg class="icon">
                            <use par:href="#icon-close"></use>
                        </svg>
            </div>
        </div>
</li>
`).insertBefore($lastLi)
        $li.on('click', (e) => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()
            hashMap.splice(index, 1)
            render()
        })
    })
}
render()
$('.addButton')
    .on('click', () => {
        let url = window.prompt('请问你添加的网址是什么？')
        if (url.indexOf('http') !== 0) {
            url = "https://" + url
            console.log(url)
        }
        hashMap.push({
            logo: removeHttp(url)[0],
            url: url
        })
        render()
    })
window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}
$(document).on('keypress', (e) => {
    const key = e.key
    for (let i = 0; i < hashMap.length; i++) {
        console.log(i)
        console.log(hashMap[i])

        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})