const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
 const pokemonRouter = require('./pokemon.js');// veo el ejemplo de arriba y me muestra que quiere que importe un archivo dentro de la misma carpeta donde estoy por el js
                                                // y como veo que no tengo auth pq no hare login ni autenticacion entonces hago un archivo con lo que si tengo, que es pokemons
                                                // y creo un archivo pokemon.js con exactamente lo mismo q tiene el ejemplo.

 const typesRouter = require('./types.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);// hago exactamente igual que arriba como no use auth lo reemplazo por el nombre del archivo que cree pokemon y sigo el mismo ejemplo de use.

router.use('/pokemons', pokemonRouter);
router.use('/types', typesRouter);

module.exports = router;
