#!/usr/bin/env python3
""" 1-fifo_cache """
from base_caching import BaseCaching
import collections


class FIFOCache(BaseCaching):
    """FifoCache dictionary"""

    def __init__(self):
        """Constructor"""
        super().__init__()
        self.queue = collections.deque()

    def put(self, key, item):
        """Add an item in the cache"""
        if key is not None and item is not None:
            if key in self.cache_data:
                self.queue.remove(key)
            elif len(self.cache_data) >= self.MAX_ITEMS:
                discard = self.queue.popleft()
                del self.cache_data[discard]
                print("DISCARD: {}".format(discard))
            self.queue.append(key)
            self.cache_data[key] = item

    def get(self, key):
        """Get an item by key"""
        if key is None or key not in self.cache_data.keys():
            return None
        return self.cache_data[key]
