-- Users table seeds here (Example)
INSERT INTO users (name,email,password)
VALUES
(
    'Eva Stanley ',
    'sebastianguerra@ymail.com',
    '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
  ),
(
    'Louisa Meyer',
    'jacksonrose@hotmail.com',
    '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
  ),
(
    'Dominic Parks',
    'victoriablackwell@outlook.com',
    '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
  );

  INSERT INTO maps(
    id,
    owner_id,
    title,
    map_url
)

VALUES(1,2,'Best Trails','map link1'),
(2,1,'Best bars','map link2'),
(3,2,'Best lakes','map link3');


INSERT INTO
  points (
  id,
  owner_id,
  map_id,
  location,
  title,
  description,
  image_url,
  star_rating,
  price_range
)

VALUES(1,1,1,'Toronto','trail 1','Nice enviornment','https://tse4.mm.bing.net/th?id=OIP.jUDC0LO0nYM8VWkn6lxDKwHaE8&pid=Api&P=0',
5,'0-$20'),
(2,2,1,'Vancouver','trail 2','Far from city','https://media.blogto.com/articles/2020818-glen.jpg?w=2048&cmd=resize_then_crop&height=1365&quality=70',
5,'10-$20'),
(3,3,1,'Toronto','trail 3','Close to lake','https://static.rootsrated.com/image/upload/s--thbn1KXv--/t_rr_large_natural/ubzptrkkch7a6yfyozmj.jpg',
5,'30-$40'),
(4,1,2,'Toronto','bar 1','Close to parking lot','https://www.architectureartdesigns.com/wp-content/uploads/2016/09/15-Distinguished-Rustic-Home-Bar-Designs-For-When-You-Really-Need-That-Drink-9.jpg',
5,'60-$100'),
(5,2,2,'Vancouver','bar 2','Expensive but worth it','https://wallup.net/wp-content/uploads/2017/11/23/414982-drink-bar.jpg',
5,'100-$120'),
(6,3,2,'Toronto','bar 3','Cheap and delicious','https://pixel.nymag.com/imgs/daily/grub/2017/04/17/bar-moga/17-bar-moga-1.w710.h473.jpg',
5,'10-$20'),
(7,1,3,'Toronto','lake 1','Very long','https://www.readersdigest.ca/wp-content/uploads/2020/07/GettyImages-1138037247.jpg',
5,'0-$20'),
(8,2,3,'Vancouver','lake 2','You can go cannoing here','http://snowbrains.com/wp-content/uploads/2013/10/HD-wallpaper-Beautiful-Places-Lake-Tahoe-Wallpapers.jpg',
5,'10-$50'),
(9,3,3,'Toronto','lake 3','Nice hotel is available','https://jooinn.com/images/mountain-lake-7.jpg',
5,'100-$200');

INSERT INTO favourited_maps(
    id,
    user_id,
    map_id
)
VALUES(1,1,1),(2,1,2),(3,2,1),(4,3,2),(5,3,3);
