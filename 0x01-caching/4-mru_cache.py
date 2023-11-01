#!/usr/bin/env python3
""" 4-mru_cache.py """
from base_caching import BaseCaching


class MRUCache(BaseCaching):
    """MRUCache dictionary"""

    def __init__(self):
        """Constructor"""
        super().__init__()
        self.queue = []

    def put(self, key, item):
        """Add an item in the cache"""
        if key is not None and item is not None:
            if key in self.cache_data:
                self.queue.remove(key)
            elif len(self.cache_data) >= self.MAX_ITEMS:
                discard = self.queue.pop(0)
                del self.cache_data[discard]
                print("DISCARD: {}".format(discard))
            self.queue.append(key)
            self.cache_data[key] = item

    def get(self, key):
        """Get an item by key"""
        if key is None or key not in self.cache_data.keys():
            return None
        self.queue.remove(key)
        self.queue.append(key)
        return self.cache_data[key]
