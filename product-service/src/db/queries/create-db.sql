create extension if not exists "uuid-ossp";

create table if not exists products (
	id uuid default uuid_generate_v4(),
	title varchar(30) not null,
	description varchar(255),
	price integer check (price >= 0),
	primary key (id)
);

create table if not exists stocks (
	product_id uuid primary key references products (id),
	count integer check (stocks.count >= 0),
	constraint fk_product
		foreign key (product_id)
		references products (id)
