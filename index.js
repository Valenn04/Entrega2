const Contenedor = require("./Contenedor");

const contenedor = new Contenedor("productos.json");

const index = async () => {
  const producto1 = await contenedor.save({ title: "Plasticola", price: 30 });
  const producto2 = await contenedor.save({ title: "Bolígrafo", price: 25 });
  const producto3 = await contenedor.save({ title: "Cartulina", price: 15 });

  console.log(producto1, producto2, producto3); 

  const object2 = await contenedor.getById(2);
  console.log(object2); 

  await contenedor.deleteById(2);

  const allCurrentObjects = await contenedor.getAll();
  console.log(allCurrentObjects); 

  //await contenedor.deleteAll();
};

index();