import sanitize from 'mongo-sanitize';
import { ObjectId } from 'mongodb';
import { toString } from 'lodash';
import { Session, getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/auth'; 
import { zUser, User, ObjectIdType } from '../_atoms/userAtom';
import { headers } from 'next/headers';

export interface OrderingOptions {

    containers: ObjectId[];
    concentrations: ObjectId[];
    solvents: ObjectId[];

}

export const getProductsInStock = async (isInStock: Boolean) => {

    const raw = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/inStock/${isInStock}`);
    const result = await raw.json();
    
    return result;

}

export const getCurrentUser = async () => {


}

export const getProductByScaffold = async (scaffold: ObjectId) => {

    const raw = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/scaffold/${scaffold}`);
    const result = await raw.json();
    
    return result;

}

export const getProductByIsFeatured = async (isFeatured: Boolean, limit = 4) => {

    const raw = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/isFeatured/${isFeatured}?limit=${limit}`, { next: { revalidate: 60 * 60 } });
    const result = await raw.json();
    
    return result;

}

export const getProductSolventsById = async (productId: ObjectId) => {

    const raw = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/options/solvents/${productId}`);
    const result = await raw.json();
    
    return result;

}

// PRODUCT ATTRIBUTES
// TO-DO: Refactor this to use the new API, which will be a lot more efficient, and will allow for more flexibility

export const getProductContainersById = async (productId: ObjectId) => {

    const raw = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/options/containers/${productId}`);
    const result = await raw.json();

    return result;

}

export const getProductConcentrationsById = async (productId: ObjectId) => {

    const raw = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/options/concentrations/${productId}`);
    const result = await raw.json();

    return result;

}

export const getProductAttributes = async (orderingOptions: OrderingOptions, productId: ObjectId) => {

    let promiseArray = [];

    let optionsSanitized = Object.keys(orderingOptions).map((option) => sanitize(toString(option)));

    console.debug(optionsSanitized);

    for( const option in orderingOptions ) {

        const raw = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/options/${option}/${productId}`);
        promiseArray.push(raw.json());

    }

    return await Promise.all(promiseArray);

}

// END PRODUCT ATTRIBUTES

export const getProductBySlug = async (slug: String) => {

    console.log(process.env.NEXT_PUBLIC_API_URL)
    console.log(slug)

    const raw = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/slug/${sanitize(slug)}`, { next: { revalidate: 60 * 60 } });
    
    if (!raw.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error(`Failed to fetch data: ${raw.status} ${raw.statusText}`)
    }

    const { success, message, product } = await raw.json();

    console.log(success)
    console.log(product)
    console.log(message)

    return { success, product };

}

export const getProducts = async () => {

    const raw = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/`, { next: { revalidate: 60 * 60 } }); // Revalidate every 1hr or 3600s

    // destructure with new, unique syntax so that we can use multiple API routes in a single component later
    const { success, data: products } = await raw.json();

    return { success, products };

}

export const getScaffolds = async ( shouldGetProducts = false ) => {

    const raw = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/scaffold/`, { next: { revalidate: 60 * 60 } });  // Revalidate every 1hr or 3600s

    // destructure with new, unique syntax so that we can use multiple API routes in a single component later
    let { success: hasScaffolds, data: scaffolds } = await raw.json();
    
    if( shouldGetProducts ) {
        
        let { success: hasProducts, products } = await getProducts(); 

        if( hasProducts && hasScaffolds ) {

            scaffolds = scaffolds.map((scaffold) => {

                scaffold.products = [];

                products.map((product) => {

                    if( scaffold._id === product.scaffold ) {
                        scaffold.products.push(product);
                    }

                });

                return scaffold;

            })

        }

    }

    return { success: hasScaffolds, scaffolds };

}

// Get pharmacore / scaffold by ID, if no ID is passed it returns all scaffolds
export const getScaffoldByID = async ({ id = '' } : { id: string }) => {

    let cleanId = id;

    const raw = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/scaffold/${id !== '' ? cleanId : null}`)
    let { success, data: scaffold } = await raw.json();

    if( success )
        scaffold = scaffold[0];

    return { success, scaffold };

}

/*
*   TODO: Protect these user endpoints so that only an authenticated user can update their profile, etc.
*   
*/

export const updateUserById = async ({ _id, user } : { _id: ObjectIdType, user: User }) => {

    _id = sanitize(_id);

    const raw = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/update/${_id}`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: headers(),
    });

    const result = await raw.json();

    return result;

}

export const getSession = async () => {

    const session = await getServerSession(authOptions) as Session;

    if( session )
        return { ...session };
    else
        return { user: null };

}

export const getUserByEmail = async ({ email, prefetch = false } : { email: String, prefetch: Boolean }) => {

    let cleanEmail = sanitize(email);
    const session = await getServerSession();

    if( session.user.email !== email && !prefetch )
        throw new Error(`You are not authenticated as user ${email}...`);

    const raw = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/email/${email}`)
    const result = await raw.json();

    return result;

}