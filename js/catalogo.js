let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click',() => {
    if(pagina < 1000){
        pagina += 1;
        cargarPerliculas();
    }
});
btnAnterior.addEventListener('click',() => {
    if(pagina > 1){
        pagina -= 1;
        cargarPerliculas();
    }
});

const cargarPerliculas = async() => {
    try{
        // &page=${pagina}
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=7def8404d1f1861265a292cfbe08b826&languaje=es-MX&page=${pagina}`);

        if(respuesta.status === 200){
            const datos = await respuesta.json();
            let peliculas = '';
            datos.results.forEach(pelicula => {
                const precio = 2000;
                peliculas += `
                    <div class="card col-2 text-decoration-none mb-5">
                        <img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" class="card-img-top agregar-carrito" alt="${pelicula.title}">
                        <h5 class="card-title col-12 text-reset text-center mb-5" style="height: 25px">${pelicula.title}</h5>
                        <h4 class="card-title col-12 text-reset text-center">${precio}</h4>
                        <div class="card-img-overlay pr-3 pl-3 pb-3 agregar-carrito" data-id="${pelicula.id}">
                            <h3 class="card-title col-12 text-reset text-center text-white h3 agregar-carrito">Agregar al carrito</h3>
                        </div>
                    </div>
                `;
            });
            document.getElementById('contenedor').innerHTML = peliculas;

        }   else if (respuesta.status === 401){
            console.log('Llave erronea');

        }   else if (respuesta.status === 404){
            console.log('Pelicula inexistente');
        } else{
            console.log('Error sin respuesta');
        }
        
    } catch (error) {
        console.log(error);
    }
    
}

cargarPerliculas();