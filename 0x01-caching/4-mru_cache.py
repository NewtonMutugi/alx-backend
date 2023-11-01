#!/usr/bin/env python3
""" 4-mru_cache.py """
from base_caching import BaseCaching
from collections import OrderedDict


class MRUCache(BaseCaching):
    """ MRUCache class """

    def __init__(self):
        """ Constructor """
        super().__init__()
        self.queue = OrderedDict()

    def put(self, key, item):
        """ Add an item in the cache """
        if key is not None and item is not None:
            if key in self.cache_data:
                self.queue.move_to_end(key, last=False)
            elif len(self.cache_data) >= self.MAX_ITEMS:
                discard = self.queue.popitem(last=True)
                del self.cache_data[discard[0]]
                print("DISCARD: {}".format(discard[0]))
            self.queue[key] = item
            self.cache_data[key] = item

    def get(self, key):
        """ Get an item by key """
        if key is None or key not in self.cache_data.keys():
            return None
        self.queue.move_to_end(key, last=False)
        return self.cache_data[key]
