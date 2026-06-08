from dataclasses import dataclass


@dataclass(frozen=True)
class Mountain:
    name: str
    country: str
    altitude: int


def generate_mountain() -> Mountain:
    return Mountain(
        name="Mount Fuji",
        country="Japan",
        altitude=3776,
    )
