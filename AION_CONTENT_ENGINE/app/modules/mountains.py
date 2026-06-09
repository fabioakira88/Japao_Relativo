from dataclasses import dataclass


@dataclass(frozen=True)
class Mountain:
    name: str
    country: str
    altitude: int


MOUNTAINS: tuple[Mountain, ...] = (
    Mountain(name="Mount Fuji", country="Japan", altitude=3776),
    Mountain(name="Mount Kita", country="Japan", altitude=3193),
    Mountain(name="Mount Hotaka", country="Japan", altitude=3190),
    Mountain(name="Mount Aino", country="Japan", altitude=3190),
    Mountain(name="Mount Yari", country="Japan", altitude=3180),
    Mountain(name="Mount Tsubakuro", country="Japan", altitude=2763),
    Mountain(name="Mount Tate", country="Japan", altitude=3015),
    Mountain(name="Mount Hakusan", country="Japan", altitude=2702),
    Mountain(name="Mount Ontake", country="Japan", altitude=3067),
    Mountain(name="Mount Norikura", country="Japan", altitude=3026),
)


def generate_mountain() -> Mountain:
    return MOUNTAINS[0]


def generate_mountains(quantity: int) -> list[Mountain]:
    return list(MOUNTAINS[:quantity])
