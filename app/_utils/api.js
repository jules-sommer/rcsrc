import sanitize from 'mongo-sanitize';

export const getProductsInStock = async (isInStock) => {

    const raw = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/inStock/${isInStock}`);
    const result = await raw.json();
    
    return result;

}

export const getCurrentUser = async () => {


}

export const getProductByScaffold = async (scaffold) => {

    const raw = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/scaffold/${scaffold}`);
    const result = await raw.json();
    
    return result;

}

export const getProductByIsFeatured = async (isFeatured, limit = 4) => {

    const raw = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/isFeatured/${isFeatured}?limit=${limit}`, { next: { revalidate: 7200 } });
    const result = await raw.json();
    
    return result;

}

export const getProductSolventsById = async (productId) => {

    const raw = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/options/solvents/${productId}`);
    const result = await raw.json();
    
    return result;

}

// PRODUCT ATTRIBUTES
// TO-DO: Refactor this to use the new API, which will be a lot more efficient, and will allow for more flexibility

export const getProductContainersById = async (productId) => {

    const raw = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/options/containers/${productId}`);
    const result = await raw.json();

    return result;

}

export const getProductConcentrationsById = async (productId) => {

    const raw = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/options/concentrations/${productId}`);
    const result = await raw.json();

    return result;

}

export const getProductAttributes = async (orderingOptions, productId) => {

    let promiseArray = [];

    let optionsSanitized = orderingOptions.map((option) => sanitize(_.toString(option)));

    console.debug(optionsSanitized);

    for( const option in orderingOptions ) {

        const raw = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/options/${option}/${productId}`);
        promiseArray.push(raw.json());

    }

    return await Promise.all(promiseArray);

}

// END PRODUCT ATTRIBUTES

export const getProductBySlug = async (molSlug) => {

    const raw = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/molSlug/${sanitize(molSlug)}`, { next: { revalidate: 60 } });
    
    if (!raw.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error(`Failed to fetch data: ${raw.status} ${raw.statusText}`)
    }

    const result = await raw.json();

    return result;

}

export const getProducts = async () => {

    const raw = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/`);
    const result = await raw.json();

    return result;

}

// Get pharmacore / scaffold by ID, if no ID is passed it returns all scaffolds
export const getScaffoldByID = async (id = '') => {

    let cleanId = sanitize(id);

    const raw = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/scaffold${id !== '' ? '/'+cleanId : null}`)
    const result = await raw.json();

    return result;

}