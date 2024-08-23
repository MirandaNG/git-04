const carrito = document.querySelector('#carrito')
const template = document.querySelector('#template').content
const templateFooter = document.querySelector('#templateFooter').content
const footer = document.querySelector('#footer')
const fragment = document.createDocumentFragment()
let carritoArray = []

document.addEventListener('click', (e) => {
    // console.log('@@@ evento => ', e)
    if (e.target.matches('.card button')) {
        agregarCarrito(e)
    }

    if (e.target.matches('.list-group-item .btn-success')) {
        btnAumentar(e)
    }
    
    if (e.target.matches('.list-group-item .btn-danger')) {
        btnDisminuir(e)
    }

    if (e.target.matches('#finalizarCompra')) {
        finalizarCompra()
    }
})

const btnAumentar = e => {
    carritoArray = carritoArray.map((item) => {
        if (item.id === e.target.dataset.id) {
            item.cantidad++
        }
        return item
    })
    pintarCarrito()
}

const btnDisminuir = e => {
    carritoArray = carritoArray.filter((item) => {
        if (item.id === e.target.dataset.id) {
            if (item.cantidad === 0)
                return
            if (item.cantidad > 0) {
                item.cantidad--
                return item
            }
        } else {
            return item
        }
    })
    pintarCarrito()
}

const finalizarCompra = () => {
    carritoArray = []
    pintarCarrito()
}

const agregarCarrito = e => {
    const producto = {
        titulo: e.target.dataset.fruta,
        id: e.target.dataset.fruta,
        cantidad: 1,
        precio: parseInt(e.target.dataset.precio)
    }

    const index = carritoArray.findIndex((item) => item.id === producto.id)
    if (index === -1) {
        carritoArray.push(producto)
    } else {
        carritoArray[index].cantidad++
    }

    pintarCarrito()
    // console.log('@@@ producto => ', producto, carritoArray, index)
}

const pintarCarrito = () => {
    carrito.textContent = ''
    const productosVisibles = carritoArray.filter(item => item.cantidad > 0)
    productosVisibles.forEach((item) => {
        const clone = template.cloneNode(true)
        clone.querySelector('.text-white .lead').textContent = item.titulo
        clone.querySelector('.rounded-pill').textContent = item.cantidad
        clone.querySelector('div .lead span').textContent = item.precio * item.cantidad
        clone.querySelector('.btn-success').dataset.id = item.id
        clone.querySelector('.btn-danger').dataset.id = item.id

        fragment.appendChild(clone)
    })
    carrito.appendChild(fragment)
    pintarFooter()
}

const pintarFooter = () => {
    footer.textContent = ''
    if (carritoArray.some(item => item.cantidad > 0)) {
        const total = carritoArray.reduce((acc, current,) => acc + current.precio * current.cantidad, 0)
        const clone = templateFooter.cloneNode(true)
        clone.querySelector('p span').textContent = total
        footer.appendChild(clone)
        footer.style.display = 'block'
    } else {
        footer.style.display = 'none'
    }
    
}

