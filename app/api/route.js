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
  newItem.id = currentData.items.length ? currentData.items[currentData.items.length - 1].id + 1 : 1;
  currentData.items.push(newItem);
  writeData(currentData);
  return NextResponse.json(newItem, { status: 201 });
}

export async function PUT(req) {
  const updatedItem = await req.json();
  const dataToUpdate = readData();
  const index = dataToUpdate.items.findIndex(item => item.id === updatedItem.id);
  if (index === -1) {
    return NextResponse.json({ message: 'Item not found' }, { status: 404 });
  }
  dataToUpdate.items[index] = updatedItem;
  writeData(dataToUpdate);
  return NextResponse.json(updatedItem);
}

export async function DELETE(req) {
  const { id } = await req.json();
  const dataToDelete = readData();
  const filteredData = dataToDelete.items.filter(item => item.id !== id);
  if (dataToDelete.items.length === filteredData.length) {
    return NextResponse.json({ message: 'Item not found' }, { status: 404 });
  }
  dataToDelete.items = filteredData;
  writeData(dataToDelete);
  return NextResponse.json(null, { status: 204 });
}
