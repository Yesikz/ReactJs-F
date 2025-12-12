
const API_URL = "https://693b736b9b80ba7262cd53ef.mockapi.io/products";


export async function obtenerProductos() {
  try {
    const respuesta = await fetch(API_URL);

    if (!respuesta.ok) {
      throw new Error("Error al obtener productos");
    }

    return await respuesta.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}


export async function obtenerProductoPorId(id) {
  try {
    const respuesta = await fetch(`${API_URL}/${id}`);

    if (!respuesta.ok) {
      throw new Error("Error al obtener el producto");
    }

    return await respuesta.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function crearProducto(producto) {
  try {
    const respuesta = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(producto),
    });

    if (!respuesta.ok) {
      throw new Error("Error al crear producto");
    }

    return await respuesta.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}


export async function editarProducto(id, producto) {
  try {
    const respuesta = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(producto),
    });

    if (!respuesta.ok) {
      throw new Error("Error al editar producto");
    }

    return await respuesta.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}


export async function eliminarProducto(id) {
  try {
    const respuesta = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!respuesta.ok) {
      throw new Error("Error al eliminar producto");
    }

    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
