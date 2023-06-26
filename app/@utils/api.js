export const getProductsInStock = async (isInStock) => {

    const raw = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/inStock/${isInStock}`);
    const result = await raw.json();
    
    return result;

}

export const getProductByScaffold = async (scaffold) => {

    const raw = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/scaffold/${scaffold}`);
    const result = await raw.json();
    
    return result;

}

export const getProductByIsFeatured = async (isFeatured, limit = 4) => {

    const raw = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/isFeatured/${isFeatured}?limit=${limit}`);
    const result = await raw.json();
    
    return result;

}

export const getProductBySlug = async (molSlug) => {

    const raw = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/molSlug/${molSlug}`);
    const result = await raw.json();

    return result;

}

export const getProducts = async () => {

    const raw = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/`);
    const result = await raw.json();

    return result;

};

export const getScaffoldByID = async (id) => {

    const raw = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/scaffold/${id}`)
    const result = await raw.json();

    return result;

}