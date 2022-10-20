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
    owner_id,
    title,
    map_url
)

VALUES(2,'Best Trails','map link1'),
(1,'Best bars','map link2'),
(2,'Best lakes','map link3');


INSERT INTO
  points (
  owner_id,
  map_id,
  lat,
  longt,
  title,
  description,
  image_url,
  star_rating,
  price_range
)

VALUES(1,1,-79.3957, 43.6493,'trail 1','Nice enviornment','https://tse4.mm.bing.net/th?id=OIP.jUDC0LO0nYM8VWkn6lxDKwHaE8&pid=Api&P=0',
5,'0-$20'),
(2,1,-79.4837, 43.6574,'trail 2','Far from city','https://media.blogto.com/articles/2020818-glen.jpg?w=2048&cmd=resize_then_crop&height=1365&quality=70',
5,'10-$20'),
(3,1,-79.3982, 43.7001,'trail 3','Close to lake','https://static.rootsrated.com/image/upload/s--thbn1KXv--/t_rr_large_natural/ubzptrkkch7a6yfyozmj.jpg',
5,'30-$40'),
(1,2,-79.4028, 43.6643,'bar 1','Close to parking lot','https://www.architectureartdesigns.com/wp-content/uploads/2016/09/15-Distinguished-Rustic-Home-Bar-Designs-For-When-You-Really-Need-That-Drink-9.jpg',
5,'60-$100'),
(2,2,-79.3647, 43.6664,'bar 2','Expensive but worth it','https://wallup.net/wp-content/uploads/2017/11/23/414982-drink-bar.jpg',
5,'100-$120'),
(3,2,-79.4109, 43.6901,'bar 3','Cheap and delicious','https://pixel.nymag.com/imgs/daily/grub/2017/04/17/bar-moga/17-bar-moga-1.w710.h473.jpg',
5,'10-$20'),
(1,3,-79.3671, 43.6434,'lake 1','Very long','https://www.readersdigest.ca/wp-content/uploads/2020/07/GettyImages-1138037247.jpg',
5,'0-$20'),
(2,3,-79.3331, 43.4567,'lake 2','You can go cannoing here','http://snowbrains.com/wp-content/uploads/2013/10/HD-wallpaper-Beautiful-Places-Lake-Tahoe-Wallpapers.jpg',
5,'10-$50'),
(3,3,-79.2990, 43.6172,'lake 3','Nice hotel is available','https://jooinn.com/images/mountain-lake-7.jpg',
5,'100-$200');

INSERT INTO favourited_maps(
    user_id,
    map_id
)
VALUES(1,1),(2,1),(1,3),(2,2),(3,2);
