-- Authors 
INSERT INTO public.authors VALUES ('39e5b641-e135-4685-9b09-3220690e337a', 'J.R.R. Tolkien', 1892, 1973, '2024-10-12 16:01:33.902054+00', '2024-10-12 16:01:33.902054+00');
INSERT INTO public.authors VALUES ('9db249e8-db85-4808-9ea0-119744619730', 'William Gibson', 1948, NULL, '2024-10-12 16:01:33.902054+00', '2024-10-12 16:01:33.902054+00');
INSERT INTO public.authors VALUES ('3dbd36ea-c85f-4ff2-aa3f-7819bb07e161', 'Stanisław Lem', 1921, 2006, '2024-10-12 16:04:46.234783+00', '2024-10-12 16:08:07.697611+00');

-- Users 
INSERT INTO public.users VALUES ('afd3c7c0-bc33-4874-b47b-f4d9ed404311', 'admin_user', 'password', 'admin@domain.com', '2024-10-12 16:01:33.902054+00', '2024-10-12 16:01:33.902054+00', true, 'admin');
INSERT INTO public.users VALUES ('928ef150-c270-4c83-8f7a-1e0fe619d379', 'normal_user', 'password', 'user@domain.com', '2024-10-12 16:01:33.902054+00', '2024-10-12 16:01:33.902054+00', true, 'user');

-- Genres 
INSERT INTO public.genres VALUES ('6f794125-5885-4c3e-a648-6d3a8268fe72', 'Fantasy', '2024-10-12 16:01:33.902054+00', '2024-10-12 16:01:33.902054+00');
INSERT INTO public.genres VALUES ('a14aa082-ec10-4cf5-966c-cc70209963ee', 'Science Fiction', '2024-10-12 16:01:33.902054+00', '2024-10-12 16:01:33.902054+00');

-- Tags 
INSERT INTO public.tags VALUES ('46600c76-924b-451a-ba9a-f69f9974e273', 'Classic', '2024-10-12 16:01:33.902054+00', '2024-10-12 16:01:33.902054+00');
INSERT INTO public.tags VALUES ('3d55e454-9bfb-47e8-8805-9d1dd6d2e7c5', 'Bestseller', '2024-10-12 16:01:33.902054+00', '2024-10-12 16:01:33.902054+00');
INSERT INTO public.tags VALUES ('9f55193e-b5f5-4656-9044-0ef603dbce74', 'Trilogy', '2024-10-12 16:01:33.902054+00', '2024-10-12 16:01:33.902054+00');

-- Books 
INSERT INTO public.books VALUES ('1cf1de84-982e-4be1-96c0-44d3e0877c9f', 'The Fellowship of the Ring', 'First part of the LOTR trilogy', '2024-10-12 16:01:33.902054+00', '2024-10-12 16:01:33.902054+00', 1954, 423, '9780261103573', 'en', 'The Lord of the Rings', 1, 'afd3c7c0-bc33-4874-b47b-f4d9ed404311', '39e5b641-e135-4685-9b09-3220690e337a');
INSERT INTO public.books VALUES ('b2fd458d-0fa2-4f85-8cec-e881e7acf4fb', 'The Two Towers', 'Second part of the LOTR trilogy', '2024-10-12 16:01:33.902054+00', '2024-10-12 16:01:33.902054+00', 1954, 352, '9780261103580', 'en', 'The Lord of the Rings', 2, 'afd3c7c0-bc33-4874-b47b-f4d9ed404311', '39e5b641-e135-4685-9b09-3220690e337a');
INSERT INTO public.books VALUES ('d5c7d5df-7567-40e1-96d6-65b02c9a0ffb', 'The Return of the King', 'Third part of the LOTR trilogy', '2024-10-12 16:01:33.902054+00', '2024-10-12 16:01:33.902054+00', 1955, 416, '9780261103597', 'en', 'The Lord of the Rings', 3, 'afd3c7c0-bc33-4874-b47b-f4d9ed404311', '39e5b641-e135-4685-9b09-3220690e337a');
INSERT INTO public.books VALUES ('ab354cc2-cc6f-4c06-8ba8-66c869f36a23', 'Neuromancer', 'First part of the Sprawl trilogy', '2024-10-12 16:01:33.902054+00', '2024-10-12 16:01:33.902054+00', 1984, 271, '9780441569595', 'en', 'Sprawl Trilogy', 1, 'afd3c7c0-bc33-4874-b47b-f4d9ed404311', '9db249e8-db85-4808-9ea0-119744619730');
INSERT INTO public.books VALUES ('098bba50-a729-4a36-bee1-c02b9395cd46', 'Count Zero', 'Second part of the Sprawl trilogy', '2024-10-12 16:01:33.902054+00', '2024-10-12 16:01:33.902054+00', 1986, 256, '9780441117734', 'en', 'Sprawl Trilogy', 2, 'afd3c7c0-bc33-4874-b47b-f4d9ed404311', '9db249e8-db85-4808-9ea0-119744619730');
INSERT INTO public.books VALUES ('01b4e269-2bb0-41ec-8952-74d7283f289b', 'Mona Lisa Overdrive', 'Third part of the Sprawl trilogy', '2024-10-12 16:01:33.902054+00', '2024-10-12 16:01:33.902054+00', 1988, 288, '9780553281743', 'en', 'Sprawl Trilogy', 3, 'afd3c7c0-bc33-4874-b47b-f4d9ed404311', '9db249e8-db85-4808-9ea0-119744619730');
INSERT INTO public.books VALUES ('f6324fe6-6d68-4f63-8b99-4f7d9865c74f', 'Solaris', 'Scifi classic by Lem, thought-provoking and enigmatic.', '2024-10-12 16:15:42.911493+00', '2024-10-12 16:16:36.565072+00', 1961, 204, '9780156027601', 'pl', NULL, NULL, 'afd3c7c0-bc33-4874-b47b-f4d9ed404311', '3dbd36ea-c85f-4ff2-aa3f-7819bb07e161');

-- Book Genres 
INSERT INTO public.book_genres VALUES ('1cf1de84-982e-4be1-96c0-44d3e0877c9f', '6f794125-5885-4c3e-a648-6d3a8268fe72');
INSERT INTO public.book_genres VALUES ('b2fd458d-0fa2-4f85-8cec-e881e7acf4fb', '6f794125-5885-4c3e-a648-6d3a8268fe72');
INSERT INTO public.book_genres VALUES ('d5c7d5df-7567-40e1-96d6-65b02c9a0ffb', '6f794125-5885-4c3e-a648-6d3a8268fe72');
INSERT INTO public.book_genres VALUES ('ab354cc2-cc6f-4c06-8ba8-66c869f36a23', 'a14aa082-ec10-4cf5-966c-cc70209963ee');
INSERT INTO public.book_genres VALUES ('098bba50-a729-4a36-bee1-c02b9395cd46', 'a14aa082-ec10-4cf5-966c-cc70209963ee');
INSERT INTO public.book_genres VALUES ('01b4e269-2bb0-41ec-8952-74d7283f289b', 'a14aa082-ec10-4cf5-966c-cc70209963ee');

-- Book Tags 
INSERT INTO public.book_tags VALUES ('1cf1de84-982e-4be1-96c0-44d3e0877c9f', '46600c76-924b-451a-ba9a-f69f9974e273');
INSERT INTO public.book_tags VALUES ('1cf1de84-982e-4be1-96c0-44d3e0877c9f', '9f55193e-b5f5-4656-9044-0ef603dbce74');
INSERT INTO public.book_tags VALUES ('b2fd458d-0fa2-4f85-8cec-e881e7acf4fb', '9f55193e-b5f5-4656-9044-0ef603dbce74');
INSERT INTO public.book_tags VALUES ('d5c7d5df-7567-40e1-96d6-65b02c9a0ffb', '3d55e454-9bfb-47e8-8805-9d1dd6d2e7c5');
INSERT INTO public.book_tags VALUES ('d5c7d5df-7567-40e1-96d6-65b02c9a0ffb', '9f55193e-b5f5-4656-9044-0ef603dbce74');
INSERT INTO public.book_tags VALUES ('ab354cc2-cc6f-4c06-8ba8-66c869f36a23', '46600c76-924b-451a-ba9a-f69f9974e273');
INSERT INTO public.book_tags VALUES ('ab354cc2-cc6f-4c06-8ba8-66c869f36a23', '9f55193e-b5f5-4656-9044-0ef603dbce74');
INSERT INTO public.book_tags VALUES ('098bba50-a729-4a36-bee1-c02b9395cd46', '9f55193e-b5f5-4656-9044-0ef603dbce74');
INSERT INTO public.book_tags VALUES ('01b4e269-2bb0-41ec-8952-74d7283f289b', '9f55193e-b5f5-4656-9044-0ef603dbce74');
INSERT INTO public.book_tags VALUES ('f6324fe6-6d68-4f63-8b99-4f7d9865c74f', '9f55193e-b5f5-4656-9044-0ef603dbce74');