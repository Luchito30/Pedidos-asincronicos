window.onload = async () => {
    const $ = (id) => document.getElementById(id);
  
    let query = new URLSearchParams(location.search);
    let id = query.has('id') && query.get('id');
  
    try {
      let response = await fetch('http://localhost:3031/api/movies/' + id);
      let result = await response.json();
      let pelicula = result.data;
      let date = moment(pelicula.release_date).format('YYYY-MM-DD');
  
      $('title').value = pelicula.title;
      $('rating').value = pelicula.rating;
      $('awards').value = pelicula.awards;
      $('release_date').value = date;
      $('length').value = pelicula.length;
    } catch (error) {
      console.error(error);
    }
  
    document.querySelector('#crear').addEventListener('click', async (e) => {
    try {
        const response = await fetch('http://localhost:3031/api/movies/create', {
          method: 'POST',
          body: JSON.stringify({
            title: $('title').value,
            rating: $('rating').value,
            awards: $('awards').value,
            release_date: $('release_date').value,
            length: $('length').value,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        const result = await response.json();
  
        // Redirigir al home
        window.location.href = 'http://127.0.0.1:5500/frontend/home.html';
      } catch (error) {
        console.error(error);
      }
      })


    document.querySelector('#editar').addEventListener('click', async (e) => {
      try {
        const response = await fetch(`http://localhost:3031/api/movies/update/${id}`, {
          method: 'PUT',
          body: JSON.stringify({
            title: $('title').value,
            rating: $('rating').value,
            awards: $('awards').value,
            release_date: $('release_date').value,
            length: $('length').value,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        const result = await response.json();
        console.log(result);
        // Redirigir al home
        window.location.href = 'http://127.0.0.1:5500/frontend/home.html'; 
      } catch (error) {
        console.error(error);
      }
    });
  
    document.querySelector('#borrar').addEventListener('click', async (e) => {
        try {
          const response = await fetch(`http://localhost:3031/api/movies/delete/${id}`, {
            method: 'DELETE',
          });
    
          const result = await response.json();
          console.log(result);
          
          // Redirigir al home
          window.location.href = 'http://127.0.0.1:5500/frontend/home.html'; 
        } catch (error) {
          console.error(error);
        }
      });
    
      document.querySelector('.formulario').addEventListener('submit', async (e) => {
        e.preventDefault();

    
      });
    };
  