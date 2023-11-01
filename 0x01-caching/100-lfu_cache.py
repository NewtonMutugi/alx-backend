#!/usr/bin/env python3
""" 100-lfu_cache """
import collections
from base_caching import BaseCaching
import collections.abc as cabs


class LFUCache(BaseCaching):
    """ LFUCache class """

    def __init__(self):
        """ Constructor """
        super().__init__()
        self.queue = collections.OrderedDict()
        self.count = {}

    def put(self, key, item):
        """ Add an item in the cache """
        if key is not None and item is not None:
            if key in self.cache_data:
                self.queue.move_to_end(key, last=False)
                self.count[key] += 1
            elif len(self.cache_data) >= self.MAX_ITEMS:
                discard = self.queue.popitem(last=True)
                del self.cache_data[discard[0]]
                del self.count[discard[0]]
                print("DISCARD: {}".format(discard[0]))
            self.queue[key] = item
            self.cache_data[key] = item
            self.count[key] = 1

    def get(self, key):
        """ Get an item by key """
        if key is None or key not in self.cache_data.keys():
            return None
        self.queue.move_to_end(key, last=False)
        self.count[key] += 1
        return self.cache_data[key]
