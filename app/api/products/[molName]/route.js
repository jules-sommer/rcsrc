import { dbConnect } from '../../dbConnect';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

import { slugify, titleize } from '../../../utils';
import { headers } from 'next/headers'
import { stdout } from 'process';

// Global mongo constants not exposed to client

const MONGO_DB_USER = process.env.MONGO_DB_USER;
const MONGO_DB_PASS = process.env.MONGO_DB_PASS;

const MONGO_DB_URL = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASS}@rcsrc-canada.vwhedxp.mongodb.net/`;

export async function GET(request, context) {

	const headersList = headers();
	const referer = headersList.get('referer');

	const molNameParam = titleize(context.params.molName);

	stdout.write(`molName param: ${molNameParam}\n}`);

	// Check if we have a valid param, if not return 400 Bad Request with error message
	if( molNameParam == undefined || molNameParam == null || molNameParam == '' ) {

		stdout.write('400 Bad Request: moleculeName param was not provided.\n');

		return NextResponse('400 Bad Request: moleculeName param was not provided.', {
			status: 400,
			headers: { referer: referer },
		});

	}

	stdout.write('200 OK: moleculeName param was provided.\n')

	const filter = {
		'molName': molNameParam,
	};

	stdout.write('Attempting to connect to database...\n');
	stdout.write('DB Filter Query: ' + JSON.stringify(filter) + '\n');
	stdout.write('mongodb url: ' + MONGO_DB_URL + '\n');

	const client = new MongoClient(MONGO_DB_URL);

	try {
		
		stdout.write('Connected to database successfully!\n'); 
		// connect to the database at specific collection
		const productsCollection = client.db('data').collection('products');

		stdout.write('Attempting to query database...\n');

		const query = { molName: molNameParam };
		
		stdout.write('Query: ' + JSON.stringify(query) + '\n');

		// wait for our results
		const product = await productsCollection.findOne(query);

		if( product )
			stdout.write(JSON.stringify(product)+'\n');

		if(product == null)
			return NextResponse.json({
				error: `404: could not find product by name "${molNameParam}"`
			}, { status: 404 });
		else
			return NextResponse.json({
				success: `Successful DB lookup: We found a product by the name of ${molNameParam}!`,
				data: product,
			}, { status: 200 });

	} finally {

		stdout.write('Closing database connection...\n');
		await client.close();

	};

}