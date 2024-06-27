import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data.json');

const readData = () => {
  const jsonData = fs.readFileSync(dataFilePath);
  return JSON.parse(jsonData);
};

const writeData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

export async function GET() {
  const data = readData();
  return NextResponse.json(data);
}

export async function POST(req) {
  const newItem = await req.json();
  const currentData = readData();
  newItem.id = currentData.businessTrips.length ? currentData.businessTrips[currentData.businessTrips.length - 1].id + 1 : 1;
  currentData.businessTrips.push(newItem);
  writeData(currentData);
  return NextResponse.json(newItem, { status: 201 });
}

export async function PUT(req) {
  const updatedItem = await req.json();
  const dataToUpdate = readData();
  const index = dataToUpdate.businessTrips.findIndex(item => item.id === updatedItem.id);
  if (index === -1) {
    return NextResponse.json({ message: 'Item not found' }, { status: 404 });
  }
  dataToUpdate.businessTrips[index] = updatedItem;
  writeData(dataToUpdate);
  return NextResponse.json(updatedItem);
}

export async function DELETE(req) {
  const { id } = await req.json();
  const dataToDelete = readData();
  const filteredData = dataToDelete.businessTrips.filter(item => item.id !== id);
  if (dataToDelete.businessTrips.length === filteredData.length) {
    return NextResponse.json({ message: 'Item not found' }, { status: 404 });
  }
  dataToDelete.businessTrips = filteredData;
  writeData(dataToDelete);
  return NextResponse.json(null, { status: 204 });
}
