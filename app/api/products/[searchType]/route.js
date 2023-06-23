import { dbConnect } from '../../dbConnect';
import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

import { getMongoClient } from '../../../@utils/db';

import _ from 'lodash';
import { slugify, titleize } from '../../../utils';
import { headers } from 'next/headers'
import { stdout } from 'process';

// Global mongo constants not exposed to client

export async function GET(request, context) {

	const headersList = headers();

	let db = await getMongoClient();

	stdout.write(`\n\CONTEXT PARAMS: ${JSON.stringify(context.params)}\n\n`);

	let contextParams = context.params.searchType;
	let value = request.nextUrl.searchParams.get('val');

	if( contextParams == 'scaffold' || contextParams == 'id' ) {
		value = new ObjectId(value);
	}

	let filter;

	switch( contextParams ) {

		case 'id':
			filter = { "_id": new ObjectId(value) };
			break;

		case 'scaffold':
			filter = { "scaffold": new ObjectId(value) };
			break;

		case 'molName':
			filter = { "molSlug": slugify(value) };
			break;
		
		case 'molSlug':
			filter = { "molSlug": slugify(value) };
			break;

		case 'inStock':
			filter = { "inStock": value === 'true' ? true : false };
			break;

		default:
			filter = {};
			break;

	}

	stdout.write(`\n\nVAL: ${JSON.stringify(value)}\n\n`);
	stdout.write(`\n\nCONTEXT PARAMS: ${JSON.stringify(contextParams)}\n\n`);
	stdout.write(`\n\filter: ${JSON.stringify(filter)}\n\n`);


	// Check if we have a valid param, if not return 400 Bad Request with error message
	if( value == undefined || contextParams == undefined || filter == undefined || typeof filter !== 'object' ) {

		stdout.write(`400 Bad Request: please provide /products/[searchType]?val={somevalue}. You provided /products/[${contextParams}]?${value}\n`);

		return NextResponse(`400 Bad Request: please provide /products/[searchType]?val={somevalue}. You provided /products/[${contextParams}]?${value}`, {
			status: 400,
			headers: { referer: referer },
		});

	}

	stdout.write('200 OK: moleculeName param was provided.\n')

	const productsCollection = db.db('data').collection('products');

	stdout.write('Attempting to filter database...\n');

	// wait for our results
	const product = await productsCollection.find(filter).toArray();

	stdout.write(JSON.stringify(product)+'\n');

	if(product == [] || product.length == 0 || !product)
		return NextResponse.json({
			error: `404: could not find product by ${JSON.stringify(filter)}!}`,
			data: [],
		}, { status: 404 });
	else
		return NextResponse.json({
			success: `Successful DB lookup: We found ${product.length} product by ${JSON.stringify(filter)}!`,
			data: product,
		}, { status: 200 });


}