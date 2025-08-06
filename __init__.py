"""Top-level package for FlowCV."""

__all__ = [
    "NODE_CLASS_MAPPINGS",
    "NODE_DISPLAY_NAME_MAPPINGS",
    "WEB_DIRECTORY",
]

__author__ = """BitWalker"""
__email__ = "koren.cai.cy@gmail.com"
__version__ = "0.1.0"

from .src.nodes import NODE_CLASS_MAPPINGS
from .src.nodes import NODE_DISPLAY_NAME_MAPPINGS

WEB_DIRECTORY = "./web"
