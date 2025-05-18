 // Variable para almacenar los productos del carrito
        let carrito = [];
        
        // Elementos del DOM
        const carritoItems = document.getElementById('carrito-items');
        const carritoVacio = document.getElementById('carrito-vacio');
        const carritoTotal = document.getElementById('carrito-total');
        const contadorCarrito = document.getElementById('contador-carrito');
        const iconoCarrito = document.getElementById('icono-carrito');
        const carritoContenedor = document.getElementById('carrito-contenedor');
        const cerrarCarrito = document.getElementById('cerrar-carrito');
        const vaciarCarrito = document.getElementById('vaciar-carrito');
        const finalizarCompra = document.getElementById('finalizar-compra');
        
        // Agregar eventos a los botones de "Agregar al carrito"
        document.querySelectorAll('.agregar-carrito').forEach(boton => {
            boton.addEventListener('click', agregarAlCarrito);
        });
        
        // Función para agregar un producto al carrito
        function agregarAlCarrito(evento) {
            const boton = evento.currentTarget;
            const id = boton.dataset.id;
            const nombre = boton.dataset.nombre;
            const precio = parseFloat(boton.dataset.precio);
            const imagen = boton.dataset.imagen;
            
            // Verificar si el producto ya está en el carrito
            const productoExistente = carrito.find(item => item.id === id);
            
            if (productoExistente) {
                // Si el producto ya está en el carrito, aumentar la cantidad
                productoExistente.cantidad++;
            } else {
                // Si es un producto nuevo, agregarlo al carrito
                carrito.push({
                    id,
                    nombre,
                    precio,
                    imagen,
                    cantidad: 1
                });
            }
            
            // Actualizar la visualización del carrito
            actualizarCarrito();
            
            // Mostrar el carrito después de agregar un producto
            carritoContenedor.classList.remove('oculto');
        }
        
        // Función para actualizar la visualización del carrito
        function actualizarCarrito() {
            // Limpiar el contenido actual del carrito
            carritoItems.innerHTML = '';
            
            // Verificar si el carrito está vacío
            if (carrito.length === 0) {
                carritoItems.appendChild(carritoVacio);
                carritoVacio.classList.remove('oculto');
            } else {
                carritoVacio.classList.add('oculto');
                
                // Agregar cada producto al carrito
                carrito.forEach(item => {
                    const carritoItem = document.createElement('div');
                    carritoItem.classList.add('carrito-item');
                    
                    carritoItem.innerHTML = `
                        <img src="${item.imagen}" alt="${item.nombre}">
                        <div class="item-detalles">
                            <h4>${item.nombre}</h4>
                            <p class="item-precio">$${item.precio.toFixed(2)}</p>
                        </div>
                        <div class="item-cantidad">
                            <button class="cantidad-btn restar-cantidad" data-id="${item.id}">-</button>
                            <span class="cantidad">${item.cantidad}</span>
                            <button class="cantidad-btn sumar-cantidad" data-id="${item.id}">+</button>
                        </div>
                        <button class="eliminar-btn" data-id="${item.id}">Eliminar</button>
                    `;
                    
                    carritoItems.appendChild(carritoItem);
                });
                
                // Agregar eventos a los botones de cantidad y eliminar
                document.querySelectorAll('.restar-cantidad').forEach(boton => {
                    boton.addEventListener('click', restarCantidad);
                });
                
                document.querySelectorAll('.sumar-cantidad').forEach(boton => {
                    boton.addEventListener('click', sumarCantidad);
                });
                
                document.querySelectorAll('.eliminar-btn').forEach(boton => {
                    boton.addEventListener('click', eliminarProducto);
                });
            }
            
            // Actualizar el total
            actualizarTotal();
            
            // Actualizar el contador del carrito
            actualizarContador();
        }
        
        // Función para restar cantidad de un producto
        function restarCantidad(evento) {
            const id = evento.currentTarget.dataset.id;
            const producto = carrito.find(item => item.id === id);
            
            if (producto.cantidad > 1) {
                producto.cantidad--;
            } else {
                // Si la cantidad es 1, eliminar el producto
                carrito = carrito.filter(item => item.id !== id);
            }
            
            actualizarCarrito();
        }
        
        // Función para sumar cantidad de un producto
        function sumarCantidad(evento) {
            const id = evento.currentTarget.dataset.id;
            const producto = carrito.find(item => item.id === id);
            producto.cantidad++;
            
            actualizarCarrito();
        }
        
        // Función para eliminar un producto del carrito
        function eliminarProducto(evento) {
            const id = evento.currentTarget.dataset.id;
            carrito = carrito.filter(item => item.id !== id);
            
            actualizarCarrito();
        }
        
        // Función para actualizar el total del carrito
        function actualizarTotal() {
            const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
            carritoTotal.textContent = `$${total.toFixed(2)}`;
        }
        
        // Función para actualizar el contador del carrito
        function actualizarContador() {
            const cantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
            contadorCarrito.textContent = cantidad;
        }
        
        // Evento para mostrar/ocultar el carrito
        iconoCarrito.addEventListener('click', () => {
            carritoContenedor.classList.toggle('oculto');
        });
        
        // Evento para cerrar el carrito
        cerrarCarrito.addEventListener('click', () => {
            carritoContenedor.classList.add('oculto');
        });
        
        // Evento para vaciar el carrito
        vaciarCarrito.addEventListener('click', () => {
            carrito = [];
            actualizarCarrito();
        });
        
        // Evento para finalizar la compra
        finalizarCompra.addEventListener('click', () => {
            if (carrito.length > 0) {
                alert('¡Gracias por tu compra! Total: ' + carritoTotal.textContent);
                carrito = [];
                actualizarCarrito();
                carritoContenedor.classList.add('oculto');
            } else {
                alert('El carrito está vacío');
            }
        });
        
        // Inicializar el carrito
        actualizarCarrito();