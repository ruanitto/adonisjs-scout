# AdonisJs Scout

Adonis Scout provides a driver based solution for searching your Lucid models, heavily inspired by [Laravel Scout](https://github.com/laravel/scout) and [Scout Elasticsearch Driver](https://github.com/babenkoivan/scout-elasticsearch-driver).

## Instalation

Use npm or yarn to install the package:

```sh
npm -i @brainnit/adonisjs-scout
# or
yarn add @brainnit/adonisjs-scout
```

Add Scout to the list of service providers at `start/app.js`:

```js
const providers = [
  // ...
  '@brainnit/adonisjs-scout/providers/ScoutProvider',
  '@brainnit/adonisjs-scout/providers/IndexKeeperProvider'
];
```

## Setup

Copy `config/index.js` to your app config folder and name it `scout.js`. Don't forget to setup your environment variables.

You may also need to install extra dependencies depending on the search engine driver you will be using. For instance, to use Elasticsearch you will need:

```sh
npm i --save elasticsearch bodybuilder
# or
yarn add elasticsearch bodybuilder
```

## Usage

Add `@provider:Searchable` trait to your models and define only the methods you want to override to change default behaviour:

```js
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class User extends Model {
  static get traits () {
    return ['@provider:Searchable']
  }
}

module.exports = Users
```

Afterwards, create your first IndexKeeper and run the following commands to create/delete indexes on your application:

```sh
# if you want to create your indexes
adonis scout:up
# or this if you want to drop indexes
adonis scout:down
```

## Search Rules

A search rule is a class that describes how a search query will be executed and allow you to build complex and reusable searches with the support of the [`Builder`](/src/Builder.js) instance.

To create a search rule use the following command:

```sh
adonis make:searchableRule MySearchRule
```

In the file app/Models/SearchableRules/MySearchRule.js you will find a class definition:

```js
'use strict'

/** @type {typeof import('@brainnit/adonisjs-scout/src/SearchRule')} */
const SearchRule = use('Scout/SearchRule')

class MySearchRule extends SearchRule {
  buildQuery () {
    return {
      'must': {
        'match': {
          'name': this.builder.query
        }
      }
    }
  }
}

module.exports = MySearchRule
```

To tell Scout about what search rules your model supports, just add the following method:

```js
  /**
   * Specify what search rules the model supports.
   * 
   * The return value(s) must always class namespaces that will be
   * resolved by IoC Container.
   *
   * @static
   * 
   * @method searchableRules
   * 
   * @return {Array|String} ES6 Class
   */
  static searchableRules () {
    return ['App/Models/SearchRules/MySearchRule']
  }
```
## Backlog

- Move index create/update operations off from indexing methods (Elasticsearch) 
- Add commands (make:scout:searchableModel, make:scout:searchRule, make:scout:indexKeeper)
- Document all error codes
- Add setup instructions
- Add badges for npm version, build status, coverals
- Add license scan
- Add better wiki/docs

What else? Please open an Issue for suggestions.
