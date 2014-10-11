var natural = require('natural');
var nounInflector = new natural.NounInflector();
var articles = require('Articles');
var randy = require('randy');
var _ = require('lodash');

// ---------------------------------------------
//                  DEFAULTS
// ---------------------------------------------

function Sentencer() {
  var self = this;

  self._nouns      = require('./words/nouns.js');
  self._adjectives = require('./words/adjectives.js');

  self.actions = {
    noun: function() {
      return randy.choice(self._nouns);
    },
    a_noun: function() {
      return articles.articlize( self.actions.noun() );
    },
    nouns: function() {
      return nounInflector.pluralize( randy.choice(self._nouns) );
    },
    adjective: function() {
      return randy.choice(self._adjectives);
    },
    an_adjective: function() {
      return articles.articlize( self.actions.adjective() );
    }
  };

  self.configure = function(options) {
    // merge actions
    self.actions     = _.merge(self.actions, options.actions || {});
    // overwrite nouns and adjectives if we got some
    self._nouns      = options.nounList || self._nouns;
    self._adjectives = options.adjectiveList || self._adjectives;
  };
}

// ---------------------------------------------
//                  THE GOODS
// ---------------------------------------------

Sentencer.prototype.make = function(template) {
  var self = this;
};

// ---------------------------------------------
//                    DONE
// ---------------------------------------------

var instance = new Sentencer();
module.exports = instance;