import '../containers/Bootstrapcss.css';
import {
  Accordion,
  Col,
  Container,
  Row,
  Table,
} from 'react-bootstrap';
import SideNav from '../components/SideNav';
import { Link } from 'react-router-dom';

export default function Description() {
  const links = [
    { href: '#Abstract', label: 'Abstract' },
    { href: '#Manobodies', label: 'Nanobodies' },
    { href: '#Drawbacks', label: 'Current methods' },
    { href: '#OurProject', label: 'Our Project' },
    { href: '#Advantages', label: 'Advantages of our approach' },
    { href: '#Conclusion', label: 'Conclusion' },
  ];

  return (
    <>
      <Container>
        <Row>
          <Col lg={2} xs={12}>
            <SideNav links={links} />
          </Col>

          <Col lg={10} xs={12}>
            <div style={{ overflowX: 'hidden' }}>
              <div className="row-wrapper">
                {/* ---------- Abstract ---------- */}
                <div id="Abstract" style={{ width: '100%' }}>
                  <h1 style={{ marginTop: '2em', width: '100%' }}>
                    Abstract
                  </h1>
                  <hr className="custom-hr" />
                  <p>
                    <strong>Nanobodies</strong> have been increasing in
                    popularity because of their many benefits over conventional
                    antibodies, but their potential remains untapped due to the
                    lengthy and expensive process associated with their complex
                    development. This is especially true for the animal
                    immunisation and screening techniques that are employed in
                    the process. To solve this, iGEM Leiden 2024 is introducing
                    a more efficient, animal-free, and cost-effective pipeline
                    for the development of nanobodies: <strong>ALPACA</strong>.
                    This novel approach uses{' '}
                    <strong>yeast surface display</strong> of bispecific
                    nanobodies to screen a custom{' '}
                    <strong>synthetic nanobody library</strong> for binders to
                    an antigen of choice. Antigen-binding ability of library
                    nanobodies is assessed, based on{' '}
                    <strong>steric hindrance</strong> between the binding sites
                    of library nanobodies and secondary GFP-binding nanobodies.
                    This results in antigen-binding yeast cells with reduced
                    green fluorescence that can be collected through
                    fluorescence-activated cell sorting (
                    <strong>FACS</strong>). Following this, DNA sequences
                    encoding the antigen-binding nanobodies are easily retrieved
                    for further development and production. Our ALPACA system
                    supports the widespread implementation of nanobodies,
                    removing the largest obstacles behind their development, and
                    foregoing the need for animal testing entirely.
                  </p>

                  <img
                    src="https://static.igem.wiki/teams/5112/project-description/graphical-abstract-3.svg"
                    alt="Nanobodies"
                    className="results-image"
                  />
                  <p className="figure-text">
                    <strong>Fig. 1</strong> | Simplified{' '}
                    <strong>A</strong>ffordable <strong>L</strong>ibrary-based{' '}
                    <strong>P</strong>ipeline for <strong>A</strong>ccelerated{' '}
                    <strong>C</strong>reation of single-domain{' '}
                    <strong>A</strong>ntibodies. <strong>ALPACA</strong> is a
                    system that supports efficient and cost-effective nanobody
                    development.
                  </p>
                </div>

                {/* ---------- Nanobodies Section ---------- */}
                <div id="Manobodies">
                  <h2 style={{ marginTop: '2em' }} id="section1">
                    Nanobodies®
                  </h2>
                  <hr className="custom-hr" />
                  <p>
                    Nanobodies are binding fragments derived from antibodies
                    naturally found in camelids, such as camels, llamas and
                    alpacas, but also in cartilaginous fish such as sharks
                    <sup>1</sup>. Most mammalian antibodies consist of two heavy
                    chains and two light chains<sup>2</sup>, but camelid
                    antibodies are comprised of only two heavy chains<sup>3</sup>
                    . Because these heavy chains are self-sustaining, the
                    binding sites of camelid antibodies are not only stable when
                    isolated but also retain their functionality. These isolated
                    binding fragments are called single-domain antibodies, but
                    are more commonly referred to as{' '}
                    <strong>nanobodies</strong> (see Fig. 2). These nanobodies
                    have higher <strong>specificity</strong> and binding{' '}
                    <strong>affinity</strong> than conventional antibodies,
                    while being significantly smaller. This makes them more
                    versatile for various biotechnological and medical
                    applications<sup>4</sup>.
                  </p>

                  <img
                    src="https://static.igem.wiki/teams/5112/home-page/ab-comparison-v3.svg"
                    alt="Nanobodies"
                    className="results-image"
                  />
                  <p className="figure-text">
                    <strong>Fig. 2</strong> | Overview of IgG antibodies from
                    humans, antibodies from camelids and nanobodies derived from
                    camelid antibodies.
                  </p>

                  {/* ---------- Accordion: Antibody structure ---------- */}
                  <Accordion defaultActiveKey="" className="custom-accordion">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        Learn more about the structure and function of
                        antibodies
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>
                          Antibodies or immunoglobulins (Ig) are essential
                          components of the immune system and can enhance an
                          immune response by binding to key receptors in the
                          immune system<sup>5</sup>. They are produced in
                          specialised antibody-secreting cells<sup>6</sup>.
                        </p>
                        <br />
                        <p>
                          The most abundant human antibody, IgG, has a Y-shaped
                          structure (as seen in Fig. 3). Each IgG molecule
                          consists of two identical heavy chains (50 kDa) and
                          two identical light chains (25 kDa), linked by
                          disulfide bonds. Each chain features a variable domain
                          (V domains) that is responsible for antigen binding
                          and one or more constant domains (C domains) that
                          interact with effector molecules. The light chains
                          contain one variable domain (VL) and one constant
                          domain (CL), while the heavy chains include one
                          variable domain (VH) and three constant domains
                          <sup>7</sup>. Some camelid antibodies consist only of
                          heavy chains and are hence called heavy chain
                          antibodies (HCAb)<sup>3</sup>. The smallest intact
                          functional antigen-binding fragment of these HCAbs is
                          the single-domain antibody (VHH), or nanobody.
                        </p>

                        <img
                          src="https://static.igem.wiki/teams/5112/project-description/ab-description.svg"
                          alt="Antibody structure"
                          className="results-image"
                          style={{ marginTop: '-1em' }}
                        />
                        <p className="figure-text">
                          <strong>Fig. 3</strong> | Antibody structure of
                          mammalian antibodies, camelid antibodies only contain
                          the effector region and the two heavy-chain VHs, which
                          can be isolated and are called VHH or nanobodies.
                        </p>

                        <p style={{ marginTop: '1em' }}>
                          Antibody-based therapeutics work through various
                          mechanisms: they can block cell-cell interactions,
                          inhibit lymphokine-cell interactions, stimulate
                          membrane-bound molecules, or destroy target cells by
                          activating complement or mediating
                          antibody-dependent cell-mediated cytotoxicity
                          <sup>8</sup>.
                        </p>

                        <p>
                          Among other applications, antibodies are useful in the
                          treatment of cancer, autoimmune diseases and
                          infectious diseases<sup>5</sup>. However, the
                          development costs of antibodies are high<sup>9</sup>,
                          they do not allow for deep tissue penetration
                          <sup>10</sup> and they can have harmful effects
                          because of their immunogenicity<sup>11</sup>.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>

                  {/* ---------- Why nanobodies useful ---------- */}
                  <h3 style={{ marginTop: '2em' }}>
                    Why are nanobodies useful?
                  </h3>
                  <hr className="custom-hr" />
                  <p>
                    Nanobodies have several distinctive properties that make
                    them highly valuable across research, diagnostic and
                    therapeutic fields.
                  </p>

                  <p
                    className="figure-text"
                    style={{ marginBottom: '0em' }}
                  >
                    <strong>Table 1</strong> | Overview of primary and secondary
                    characteristics of nanobodies adapted from Muyldermans
                    (2020)<sup>4</sup>.
                  </p>

                  {/* ---------- Table: characteristics ---------- */}
                  <div
                    className="table-wrapper"
                    style={{ marginTop: '0.5em' }}
                  >
                    <table className="table-primers">
                      <thead>
                        <tr>
                          <th>Primary characteristics</th>
                          <th>Secondary characteristics</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Small size/Low molecular weight</td>
                          <td>Fast blood clearance</td>
                        </tr>
                        <tr>
                          <td>High specificity</td>
                          <td>Deep penetration in tissues</td>
                        </tr>
                        <tr>
                          <td>High affinity</td>
                          <td>
                            Low immunogenicity (well tolerated and non-toxic)
                          </td>
                        </tr>
                        <tr>
                          <td>Robust</td>
                          <td>Long shelf life</td>
                        </tr>
                        <tr>
                          <td>Monomeric</td>
                          <td>High solubility</td>
                        </tr>
                        <tr>
                          <td>Simple structure</td>
                          <td>Directional immobilisation</td>
                        </tr>
                        <tr>
                          <td>Genetically codeable</td>
                          <td>
                            Can be split and integrated into other protein
                            scaffolds
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* ---------- Accordion: Applications ---------- */}
                  <Accordion defaultActiveKey="" className="custom-accordion">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        What can we do with nanobodies?
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>
                          They are ideal for research, diagnostics, and
                          therapeutic applications, including targeting cancer
                          cells, neutralising pathogens, delivering drugs
                          directly to disease sites, and more (see Table 2).
                        </p>

                        <p
                          className="figure-text"
                          style={{ marginBottom: '0em' }}
                        >
                          <strong>Table 2</strong> | Overview of possible
                          nanobody applications from Muyldermans (2020)
                          <sup>4</sup>.
                        </p>

                        <Table
                          bordered
                          hover
                          responsive="md"
                          className="table-results"
                          style={{ marginTop: '0.5em' }}
                        >
                          <thead>
                            <tr>
                              <th>Research</th>
                              <th>Applications</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* Research section */}
                            <tr>
                              <td
                                rowSpan={8}
                                style={{
                                  textAlign: 'center',
                                  verticalAlign: 'middle',
                                }}
                              >
                                <strong>Research</strong>
                              </td>
                              <td>Target crystallisation chaperone</td>
                            </tr>
                            <tr>
                              <td>Superresolution microscopy tool</td>
                            </tr>
                            <tr>
                              <td>Intracellular expression/intrabodies</td>
                            </tr>
                            <tr>
                              <td>
                                Intracellular target tracing; interference with
                                endogenous target
                              </td>
                            </tr>
                            <tr>
                              <td>
                                Interference with <i>in&nbsp;vivo</i> function
                                of endogenous Ag
                              </td>
                            </tr>
                            <tr>
                              <td>Developmental biology</td>
                            </tr>
                            <tr>
                              <td>
                                Manifold constructs
                                (bivalent/biparatopic/multivalent/bispecific)
                              </td>
                            </tr>
                            <tr>
                              <td>Immunomicroscopy</td>
                            </tr>

                            {/* In vitro diagnostics section */}
                            <tr>
                              <td
                                rowSpan={2}
                                style={{
                                  textAlign: 'center',
                                  verticalAlign: 'middle',
                                }}
                              >
                                <strong>
                                  <i>In&nbsp;vitro</i> diagnostics
                                </strong>
                              </td>
                              <td>Lateral flow assays</td>
                            </tr>
                            <tr>
                              <td>Electrochemical Ag detection</td>
                            </tr>

                            {/* In vivo diagnostics section */}
                            <tr>
                              <td
                                rowSpan={1}
                                style={{
                                  textAlign: 'center',
                                  verticalAlign: 'middle',
                                }}
                              >
                                <strong>
                                  <i>In&nbsp;vivo</i> diagnostics
                                </strong>
                              </td>
                              <td>Noninvasive <i>in&nbsp;vivo</i> imaging</td>
                            </tr>

                            {/* Therapy section */}
                            <tr>
                              <td
                                rowSpan={5}
                                style={{
                                  textAlign: 'center',
                                  verticalAlign: 'middle',
                                }}
                              >
                                <strong>Therapy</strong>
                              </td>
                              <td>Autoimmune disease and inflammation</td>
                            </tr>
                            <tr>
                              <td>Cancer</td>
                            </tr>
                            <tr>
                              <td>Infectious diseases</td>
                            </tr>
                            <tr>
                              <td>Envenoming (e.g., snakebites)</td>
                            </tr>
                            <tr>
                              <td>Immuno-pheresis</td>
                            </tr>

                            {/* Agro‑Biotech section */}
                            <tr>
                              <td
                                rowSpan={3}
                                style={{
                                  textAlign: 'center',
                                  verticalAlign: 'middle',
                                }}
                              >
                                <strong>(Agro-)Biotech</strong>
                              </td>
                              <td>Immuno-adsorbents</td>
                            </tr>
                            <tr>
                              <td>Protection of plants against pathogens</td>
                            </tr>
                            <tr>
                              <td>Animal feeding</td>
                            </tr>
                          </tbody>
                        </Table>

                        <p style={{ marginTop: '2em' }}>
                          As a result of these features and applications,
                          nanobodies are gaining increasing recognition. In
                          fact, the number of nanobody-related articles and
                          clinical trials has increased by more than 300&nbsp;%
                          in the 5 years to 2021<sup>16</sup> (see Fig. 4).
                          Nanobodies are increasingly being recognised for their
                          huge potential in research and therapeutics
                          <sup>17</sup>, which in turn is fuelling the demand
                          for more efficient, high-throughput nanobody
                          development processes.
                        </p>
                        <br />
                        <p>
                          Look at our{' '}
                          <Link
                            to="/entrepreneurship"
                            className="link-animated-underline"
                          >
                            entrepreneurship page
                          </Link>{' '}
                          for more information about the rapid growth of
                          nanobody demand.
                        </p>

                        <img
                          src="https://static.igem.wiki/teams/5112/project-description/nanobody-articles.png"
                          alt="Nanobody growth"
                          className="results-image"
                        />
                        <p className="figure-text">
                          <strong>Fig. 4</strong> | Overview of the number of
                          research articles identified each year from 1986 to
                          2023. Search query: Single-Domain Antibodies OR
                          nanobodies OR nanobody OR single domain antibody
                          OR single domain antibodies OR V.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>

                  {/* ---------- Accordion: Approved therapeutics ---------- */}
                  <Accordion defaultActiveKey="" className="custom-accordion">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        Learn more about approved nanobody therapeutics
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>
                          Nanobodies have shown great promise in therapeutics
                          <sup>18</sup>, and a few have already been approved
                          for clinical use to treat diseases where conventional
                          antibodies fall short.
                        </p>

                        <p
                          className="figure-text"
                          style={{ marginBottom: '0em' }}
                        >
                          <strong>Table3</strong> | Overview of clinically
                          approved nanobody medicines.
                        </p>

                        <table
                          className="table-results"
                          style={{
                            width: '80%',
                            textAlign: 'center',
                            justifyContent: 'center',
                            marginTop: '0.5em',
                          }}
                        >
                          <thead>
                            <tr>
                              <th style={{ width: '20%' }}>Name</th>
                              <th style={{ width: '70%' }}>Description</th>
                              <th style={{ width: '10%' }}>Reference</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={{ width: '20%' }}>
                                Caplacizumab (Cablivi)
                              </td>
                              <td style={{ width: '70%' }}>
                                Caplacizumab is used to treat acquired thrombotic
                                thrombocytopenic purpura (aTTP), a rare blood
                                autoimmune disorder. It works by inhibiting the
                                interaction between the vonWillebrand factor and
                                platelets, preventing the formation of blood
                                clots that can damage organs.
                              </td>
                              <td style={{ width: '10%' }}>19</td>
                            </tr>
                            <tr>
                              <td style={{ width: '20%' }}>Ozoralizumab</td>
                              <td style={{ width: '70%' }}>
                                Ozoralizumab is a nanobodybased drug designed
                                to treat rheumatoid arthritis. It targets and
                                neutralises tumour necrosis factor alpha
                                (TNF), a key driver of inflammation in
                                autoimmune diseases.
                              </td>
                              <td style={{ width: '10%' }}>20</td>
                            </tr>
                            <tr>
                              <td style={{ width: '20%' }}>Vobarilizumab</td>
                              <td style={{ width: '70%' }}>
                                This nanobody is in advanced clinical trials to
                                treat autoimmune diseases such as rheumatoid
                                arthritis and lupus. It targets interleukin6
                                (IL6), a cytokine involved in the inflammatory
                                response, helping to reduce the symptoms of
                                autoimmune disorders.
                              </td>
                              <td style={{ width: '10%' }}>21</td>
                            </tr>
                          </tbody>
                        </table>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>

                {/* ---------- Drawbacks Section ---------- */}
                <div id="Drawbacks">
                  <h2 style={{ marginTop: '2em' }} id="section2">
                    The drawbacks of current methods
                  </h2>
                  <hr className="custom-hr" />

                  <img
                    src="https://static.igem.wiki/teams/5112/project-description/current-bad-method-new.svg"
                    alt="Nanobodies"
                    className="results-image"
                  />
                  <p className="figure-text">
                    <strong>Fig.5</strong> | Overview of current, most used
                    method for nanobody development.
                  </p>

                  <p style={{ marginTop: '2em' }}>
                    Current methods of nanobody development are expensive,
                    labourntensive and timeconsuming, because they involve
                    the immunisation of live animals, such as alpacas or
                    llamas. After animal immunisation, antibody mRNA is
                    extracted from their blood and ultimately made into an
                    immunised library of nanobody sequences<sup>4</sup>. These
                    nanobody sequences are then screened using phage display,
                    whereby they are expressed on the surface of bacteriophages
                    and exposed to the immobilised target antigens. The phages
                    that do not bind are washed away, and the nanobody sequences
                    from bound phages are extracted and produced in{' '}
                    <em>E.coli</em>
                    <sup>22</sup>.
                  </p>
                  <br />
                  <p>
                    Phage display has several downsides, such as the production
                    of large amounts of non‑functional “bald” phages due to poor
                    nanobody expression and the fragility of long, thin virions
                    that make them prone to damage during handling, leading to a
                    loss of infectivity. To meet growing demand and unlock
                    nanobodies’ therapeutic potential, alternative, efficient
                    and cost‑effective screening approaches are essential.
                    Yeast‑based library screening systems, for example, offer
                    superior performance in certain aspects like binder
                    retrieval and multiplexing of antigens<sup>23</sup>.
                  </p>

                  <h1
                    className="alpaca-banner"
                    style={{ width: '85%', margin: '1em auto' }}
                  >
                    This is where our project comes in!
                  </h1>

                  <Accordion
                    defaultActiveKey=""
                    className="custom-accordion"
                  >
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        Learn more about the traditional methods and their
                        drawbacks
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>
                          The traditional method for nanobody development and
                          screening is a long and costly multi‑step process,
                          involving animal immunisation. This process involves
                          injecting an animal, such as a llama or alpaca, with a
                          target antigen four to eight times over the course of
                          approximately two months to trigger an immune
                          response. In order to increase the antibody yield to
                          obtain the optimal amount for a library, multiple
                          animals need to be injected. After immunisation, an
                          immunised library is created by extracting the
                          antibodys mRNA from the animal blood. This mRNA is
                          converted into cDNA and the binding fragments, or
                          nanobodies, are amplified<sup>4</sup>. After an
                          immunised library is created, a tedious screening
                          process follows to select the optimal nanobodies from
                          the library.
                        </p>

                        <h3 style={{ marginTop: '1em' }}>
                          Screening of AntigenBinding Nanobodies
                        </h3>

                        <p>
                          To identify the most effective nanobodies out of the
                          naïve or immunised library, a process called phage
                          panning is employed. This technique involves
                          expressing the naïve or immunised library nanobodies
                          on the surface of M13 bacteriophages produced by{' '}
                          <em>E.coli</em>. These phages are introduced to the
                          immobilised target antigen (see Fig.6).
                        </p>

                        <img
                          src="https://static.igem.wiki/teams/5112/project-description/pahe-display.svg"
                          alt="Phage display"
                          className="results-image"
                          style={{ transform: 'rotate(-.4deg)' }}
                        />
                        <p className="figure-text">
                          <strong>Fig.6</strong> | Overview of phage display.
                        </p>

                        <p style={{ marginTop: '2em' }}>
                          Phages that do not bind to the antigen are removed
                          through a washing process, which carries them into a
                          waste container. Since nonspecific binding can occur,
                          this procedure is repeated times to ensure that
                          only the phages that display antigenbinding
                          nanobodies are selected. The nanobody sequences are
                          then isolated from the phages bound to the target
                          antigen<sup>22</sup>. After that, the isolated
                          nanobody sequences are inserted into <em>E.coli</em>{' '}
                          cells, which are used to produce the desired
                          nanobodies.
                        </p>

                        <h3 style={{ marginTop: '1em' }}>
                          Drawbacks of current methods
                        </h3>

                        <p>
                          Harvesting an immunised library from animals is
                          labountensive and costly. Furthermore, antigens
                          such as DNA or RNA are not immunogenic enough to
                          produce the desired immune response, so they have to
                          be injected alongside harmful substances. Compounds
                          like clotting factors can be lethal to alpacas or pose
                          an environmental risk<sup>4</sup>, making it
                          impractical to develop nanobodies against them.
                          Together with the tedious screening procedure, the
                          entire nanobody development process can take several
                          months.
                        </p>
                        <br />
                        <p>
                          Phage display has several downsides. These include the
                          production of large amounts of nonfunctional “bald”
                          phages due to poor nanobody expression, which reduces
                          the efficiency of targetspecific selection.
                          Additionally, the fragility of long, thin virions
                          makes them prone to damage during handling, leading to
                          a loss of infectivity, while yeast and bacterial
                          display systems offer superior performance in certain
                          aspects like binder retrieval and
                          multiplexing<sup>23</sup>. Unlike in yeastbased
                          nanobody library screening, highthroughput screening
                          methods like FACS cannot be used with phage display
                          because the amount of nanobodies per phage displayed
                          is too small<sup>23</sup>. Protein misfolding is also
                          a concern since <em>E.oli</em> lacks the complex
                          folding systems found in eukaryotes<sup>23</sup>. Most
                          phage display methods also need the antigens to be
                          carefully immobilised, which means applying
                          timeconsuming techniques like antigen coating
                          <sup>24</sup>.
                        </p>

                        <h3 style={{ marginTop: '1em' }}>
                          Alternative methods in use
                        </h3>

                        <p>
                          Another less commonly used option to create a library
                          is the naïve library. These require large amounts of
                          animal blood from at least ten animals before the
                          diversity required for a library is
                          reached<sup>4</sup>. Again, antibody mRNA is retrieved
                          and converted into cDNA, after which only the binding
                          domains, or nanobodies, are amplified<sup>25</sup>.
                          This process is quite similar to obtaining an
                          immunised library, except that the nanobodies have not
                          been filtered by the camelids immune system to
                          specifically target the antigen.
                        </p>
                        <br />
                        <p>
                          Alternative methods for screening such as bacterial
                          and traditional yeast surface displays require antigen
                          tagging with an additional protein or fluorescent dye
                          for effective screening<sup>26</sup>. A thorough
                          understanding of the s structure is needed for
                          these approaches to be useful, as they can cause
                          protein structures to be altered or obscured. This
                          makes them unsuitable for poorly defined antigens.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>

                {/* ---------- Our Project Section ---------- */}
                <div id="OurProject">
                  <h2 style={{ marginTop: '2em' }} id="section3">
                    Our Project
                  </h2>
                  <hr className="custom-hr" />

                  <p>
                    With{' '}
                    <strong>
                      A.L.P.A.C.A. (Affordable Libraryased Pipeline for
                      Accelerated Creation of singledomain Antibodies)
                    </strong>
                    , we are creating an innovative alternative to the current
                    process of developing nanobodies, making the development of
                    these proteins <strong>cheaper, faster, and animalfree</strong>. Through our
                    approach, we want to accelerate the development of
                    nanobodies for a wide range of applications, from
                    therapeutics to environmental sensing<sup>27</sup>. To
                    achieve this, we have been developing a system that uses
                    genetically engineered yeast (
                    <em>Saccharomyces cerevisiae</em>) to select nanobodies from
                    a synthetic library.
                  </p>

                  <h3 style={{ marginTop: '1em' }}>Yeast display</h3>

                  <p>
                    The ALPACA pipeline begins by transforming bispecific
                    nanobodies, which consist of two different nanobodies linked
                    together, into <em>S.cerevisiae</em> yeast cells. This
                    allows them to be displayed on the yeast cell surface using
                    a system called <strong>yeast surface display</strong>{' '}
                    (YSD). These bispecific nanobodies consist of a green
                    fluorescent protein (GFP)targeting nanobody and a variable
                    nanobody from our synthetic library. The screening process
                    consists of the incubation of the transformed yeast cell
                    with the target antigen, followed by the addition of GFP
                    (see Fig.7). Because of the structure of the bispecific
                    nanobody, we expect steric hindrance between an
                    antigenbinding library nanobody and GFP. This steric
                    hindrance will then prevent GFP from binding to the
                    GFPtargeting nanobody. The advantage of our system over
                    other yeast surface display systems is that it does not
                    require antigen tagging, making our pipeline more efficient.
                  </p>

                  <div className="expert-advice-box">
                    <h2>Steric hindrance</h2>
                    <p>
                      Steric hindrance can block protein binding by interfering
                      with nearby structures. In our project, we use this
                      principle to prevent GFP from binding to the
                      GFP‑argeting nanobody. We used an HSAtargeting nanobody
                      with HSA as a control to demonstrate that when HSA binds
                      with high affinity, it reduces GFPs ability to bind to
                      its nanobody.
                    </p>

                    <img
                      src="https://static.igem.wiki/teams/5112/engineering/steric-hindrance-v7.svg"
                      alt="Steric hindrance"
                      className="results-image"
                    />
                    <p className="figure-text">
                      <strong>Fig.7</strong> | Overview of steric
                      hindrancebased nanobody library screening with the ALPACA
                      YSDProbe.
                    </p>
                  </div>

                  <p style={{ marginTop: '2em' }}>
                    This will result in nongreen fluorescent yeast cells,
                    indicating that the library nanobody has successfully bound
                    to the target antigen, as well as a significant number of
                    green fluorescent yeast cells, where the target antigen did
                    not bind to the library nanobody. The green fluorescent
                    signal is compared with the red signal from a red
                    fluorescent antiHA (human influenza hemagglutinin)
                    antibody, which is bound to an 8mino acid HAag in the
                    stalk used in our pipeline. This helps ensure that the green
                    signal reflects true binding and not different expression
                    levels.
                  </p>

                  <img
                    src="https://static.igem.wiki/teams/5112/project-description/new-pipeline.svg"
                    alt="Yeast display"
                    className="results-image"
                  />
                  <p className="figure-text">
                    <strong>Fig.8</strong> | Overview of ALPACA pipeline.
                  </p>

                  <h3 style={{ marginTop: '2em' }}>FACS</h3>

                  <p>
                    Next, the yeast cells are screened using{' '}
                    <strong>Fluorescenceactivated Cell Sorting</strong> (FACS)
                    to isolate the non greenfluorescent cells that are bound to
                    the library nanobodies with the highest affinity for the
                    target (Fig.9). After identifying these highaffinity
                    binders, their DNA sequences are isolated. The obtained
                    nanobody sequences are introduced in <em>E.oli</em> for
                    smallscale production and validation testing. If these
                    tests are successful, largescale production in{' '}
                    <em>E.coli</em> can then begin.
                  </p>

                  <img
                    src="https://static.igem.wiki/teams/5112/project-description/facs-1-1.svg"
                    alt="FACS"
                    className="results-image"
                    style={{ height: '500px' }}
                  />
                  <p className="figure-text">
                    <strong>Fig.9</strong> | Overview of FACS. FACS is a
                    technique used in biology to sort and analyse cells. By
                    shining a laser on the cells as they flow through one by
                    one, it detects the differences in fluorescence, identifies
                    different types of cells and separates them into different
                    containers.
                  </p>

                  <p style={{ marginTop: '2em' }}>
                    Please visit our{' '}
                    <Link
                      to="/human-practices"
                      className="link-animated-underline"
                    >
                      Human Practices page
                    </Link>{' '}
                    to learn more about the experts we consulted, the roles they
                    played in our project, and how their insights shaped its
                    development.
                  </p>

                  {/* ---------- Accordion: Library creation ---------- */}
                  <Accordion defaultActiveKey="" className="custom-accordion">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        From immune to synthetic libraries
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>
                          In contrast to immunised and naive libraries, which
                          rely on an animals immune response or the natural
                          antibody repertoire of multiple animals, a synthetic
                          library is created without the use of animals.
                          Currently, synthetic nanobody libraries are built
                          using trinucleotide phosphoramidites, which allow
                          precise variation in the
                          complementaritydetermining regions (CDRs)
                          <sup>26,28</sup>. These three CDRs in nanobodies
                          determine their binding properties, with some
                          positions limited to specific amino acids and others
                          allowing broader variability (see Fig.10). This
                          approach ensures a controlled library of functional
                          nanobody sequences<sup>26</sup>.
                        </p>
                        <br />
                        <p>
                          In the ALPACA pipeline, we have created a synthetic
                          nanobody library by randomising the CDRs using
                          degenerate primers. Certain codons, such as cysteine
                          and stop codons, are avoided to prevent issues with
                          reactivity or protein synthesis, while alanine,
                          serine, threonine, tyrosine, and asparagine are
                          favoured for their roles in antigen binding. CDR1 and
                          CDR2 have fixed lengths, while CDR3 is more variable.
                          The remainder of the nanobody DNAsequence, the
                          consensus sequence, remains consistent across
                          nanobodies (Fig.13).
                        </p>
                        <br />
                        <p>
                          By focusing on just three CDRs, a synthetic nanobody
                          library is relatively easy to engineer and modify,
                          allowing for screening of nanobodies with optimal
                          affinity and specificity toward a target
                          antigen<sup>29</sup>. Synthetic libraries contain more
                          variation than can be obtained through an immunised or
                          naive library, and provide a range of nanobodies
                          against virtually any target antigen<sup>43</sup>. They
                          are also known to create a wide variety of sequences
                          that are not constrained by the natural limitations or
                          redundancies found in antibodies produced by living
                          organisms<sup>44</sup>. It must, however be noted that
                          the clonal diversity of techniques, such as yeast
                          surface display and <em>E.oli</em> display, is
                          limited at around 10<sup>8</sup>
                          <sup>30,31</sup>. While techniques such as phage
                          panning and ribosome display allow for higher library
                          diversity, the resulting nanobody sequences are
                          comparable in quality<sup>4</sup>.
                        </p>
                        <br />
                        <p>
                          For more details on our library creation process, see
                          the{' '}
                          <Link
                            to="/results"
                            className="link-animated-underline"
                          >
                            Results page
                          </Link>{' '}
                          and{' '}
                          <Link to="/model" className="link-animated-underline">
                            modelling page
                          </Link>
                          .
                        </p>

                        <img
                          src="https://static.igem.wiki/teams/5112/project-description/schermafbeelding-2024-09-27-112522-removebg-preview.png"
                          alt="Synthetic library"
                          className="results-image"
                        />
                        <p className="figure-text">
                          <strong>Fig.10</strong> | (a) Llama nanobody amino
                          acid structure where the three CDRs are visible; CDR1
                          (blue), CDR2 (green), and CDR3 (orange). (b) Nanobody
                          protein structure after folding contains the three
                          CDRs; CDR1 (blue), CDR2 (green), and CDR3 (orange).
                          Adapted with permission from McMahon etal.
                          2018<sup>26</sup>.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>

                  {/* ---------- Accordion: Affinity maturation ---------- */}
                  <Accordion defaultActiveKey="" className="custom-accordion">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        Affinity maturation in synthetic libraries
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>
                          Through{' '}
                          <Link
                            to="/human-practices"
                            className="link-animated-underline"
                          >
                            discussions with experts
                          </Link>
                          , we identified a key consideration regarding the use
                          of a synthetic library in our project. Specifically,
                          we need to ensure that it is compatible for{' '}
                          <em>in&nbsp;vitro</em> affinity maturation.
                        </p>

                        <p>
                          For the generation of optimal diversity in a nanobody
                          library, the synthesis occurs in two key steps. The
                          first involves generation of the initial sequences of
                          the library, and the second is{' '}
                          <em>in&nbsp;vitro</em> affinity maturation
                          <sup>30</sup>, a process that modifies isolated
                          nanobodies to improve their binding affinity<sup>32</sup>
                          . Immunised libraries undergo{' '}
                          <em>in&nbsp;vivo</em> affinity maturation naturally
                          within the animal’s immune system<sup>30</sup>, a
                          process involving somatic mutations and antigen
                          selection of B‑cells, each step yielding small
                          increases in binding affinity<sup>33</sup>.
                        </p>
                        <br />
                        <p>
                          Yeast surface display, combined with{' '}
                          <em>in&nbsp;vitro</em> affinity maturation, is known
                          to produce nanobodies with extremely high
                          affinities<sup>30</sup>. Various methods for{' '}
                          <em>in&nbsp;vitro</em> affinity maturation exist
                          <sup>30</sup>, such as applying selective pressure
                          during library screening<sup>34</sup> or using
                          techniques such as homology modelling and molecular
                          docking<sup>32</sup>. Nanobodies are particularly
                          suitable for <em>in&nbsp;vitro</em> affinity
                          maturation because they are easy to genetically
                          engineer<sup>35,37</sup>. <em>In&nbsp;vitro</em>{' '}
                          affinity maturation can therefore compensate for any
                          potential misidentification of the highest‑affinity
                          nanobody during the selection stage of the
                          process<sup>4</sup>.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>

                {/* ---------- Advantages Section ---------- */}
                <div id="Advantages">
                  <h2 style={{ marginTop: '2em' }} id="section4">
                    The advantage of screening through yeast surface display
                  </h2>
                  <hr className="custom-hr" />

                  <p>
                    The advantage of using a yeast display system is its ability
                    to identify the highestaffinity binders from any display
                    technique<sup>36</sup>. The yeast can also be cultured after
                    cell sorting before the nanobody DNA is isolated, resulting
                    in a higher yield of nanobody DNA sequence<sup>23</sup>.
                  </p>
                  <br />
                  <p>
                    Meanwhile, phage display leads to a higher chance of
                    misfolding than yeast surface display. This is because
                    phages lack posttranslational systems, while yeasts have
                    eukaryotic expression systems capable of complex
                    postranslational folding<sup>36</sup>. Moreover, phage
                    display is not ideal for highthroughput screening
                    methods<sup>37</sup>, whereas yeast surface display in{' '}
                    <em>S.cerevisiae</em> is highly suitable for techniques
                    like FACS<sup>36</sup>. <em>S.cerevisiae</em> can display
                    up to 100,000 protein copies on its cell surface<sup>38</sup>. Furthermore, only standard laboratory equipment and materials are needed for yeast surface display<sup>38</sup>, making it a faster, cheaper, and more efficient method than phage display.
                  </p>

                  {/* ---------- Accordion: Considerations ---------- */}
                  <Accordion defaultActiveKey="" className="custom-accordion">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        Considerations for using yeast
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>
                          Through{' '}
                          <Link
                            to="/human-practices"
                            className="link-animated-underline"
                          >
                            discussions with experts
                          </Link>
                          , we identified key considerations regarding the use
                          of yeast in our project. Specifically, we need to
                          ensure that each yeast cell displays only one library
                          nanobody and address the issue of yeast
                          autofluorescence, which could potentially interfere
                          with our FACS analysis.
                        </p>
                        <br />
                        <p>
                          To make sure unique transformants containing one
                          plasmid are obtained, a high transformation efficiency
                          is crucial<sup>38</sup>. In addition, aiming for
                          10‑100× coverage of the library size during
                          transformation helps ensure that unique transformants
                          are obtained<sup>39</sup>. Furthermore, using a small
                          amount of input DNA, combined with a high
                          transformation efficiency, helps ensure that each
                          yeast cell is likely to take up only a single
                          plasmid<sup>39</sup>. Lastly, it was also found that
                          the selection marker of leucine, which we use in{' '}
                          <Link
                            to="/parts"
                            className="link-animated-underline"
                          >
                            our system
                          </Link>
                          , decreases the copy number of plasmid in the yeast
                          cells<sup>39</sup>. This would also result in a higher
                          chance of unique transformants.
                        </p>
                        <br />
                        <p>
                          Yeast cells are autofluorescent<sup>40</sup>, which
                          could interfere with the FACS. This can be minimised
                          by making sure the yeast is in the exponential growth
                          phase, where they are shown to exhibit reduced
                          autofluorescence. This is because metabolically active
                          cells have lower accumulation of fluorescent compounds
                          and there is a lower build‑up of storage molecules
                          that can contribute to autofluorescence. Moreover,
                          yeast cells in the same phase without any fluorescence
                          markers could also be used as controls to help filter
                          out autofluorescence.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>

                  {/* ---------- Accordion: Binding & steric ---------- */}
                  <Accordion defaultActiveKey="" className="custom-accordion">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        Binding Affinities & Steric Hindrance
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>
                          Our system offers a distinct advantage over
                          traditional methods, which require antigen tagging or
                          immobilisation and depend on knowledge of the target
                          antiges structure and binding properties. The key
                          innovation of our pipeline lies in making use of
                          steric hindrance, which eliminates the need for
                          antigen tagging and sets our system apart as more
                          efficient and streamlined. Our pipeline only requires
                          the size of the antigen to be large enough to ensure
                          steric hindrance. Steric hindrance can block protein
                          binding by interfering with nearby structures
                          <sup>43</sup>.
                        </p>
                        <br />
                        <p>
                          In our project, we harness the concept of steric
                          hindrance to block GFP from binding to the
                          GFPtargeting nanobody (see Fig.11). As a proof of
                          concept, we use an HSAtargeting nanobody and HSA as
                          controls instead of the library, showcasing how steric
                          hindrance works in our system. When HSA binds to its
                          specific nanobody, it does so with high affinity
                          <sup>44</sup>. This binding creates steric hindrance
                          for the GFPanobody attempting to bind GFP, which
                          corresponds to a decrease in the affinity of the
                          GFPnanobody for GFP, effectively preventing GFP from
                          binding.
                        </p>
                        <br />
                        <p>
                          We have estimated that this effect on the
                          GFPnanobody affinity results in at least a 1000fold
                          decrease; more info can be found on our{' '}
                          <Link
                            to="/model"
                            className="link-animated-underline"
                          >
                            Modelling page
                          </Link>
                          . To achieve the necessary steric hindrance, we
                          connect the two nanobodies with a protein linker
                          consisting of a polypeptide linking two protein
                          domains together. Since different linkers result in
                          varying orientations and degrees of rigidity (see
                          Fig.11), we test several options, both through
                          modelling and through <em>in&nbsp;vitro</em>{' '}
                          experiments, which can be found on our{' '}
                          <Link
                            to="/model"
                            className="link-animated-underline"
                          >
                            modelling page
                          </Link>{' '}
                          and{' '}
                          <Link
                            to="/results"
                            className="link-animated-underline"
                          >
                            results page
                          </Link>
                          . Once desirable linkers are identified, they are
                          integrated back into the yeast display system to
                          create an optimised bispecific nanobody display
                          construct.
                        </p>

                        <img
                          src="https://static.igem.wiki/teams/5112/engineering/steric-hindrance-v7.svg"
                          alt="Steric hindrance"
                          className="results-image"
                        />
                        <p className="figure-text">
                          <strong>Fig.11</strong> | Two different linkers could
                          give two different orientations of our bispecific
                          nanobodies.
                        </p>

                        <p>
                          Typically, natural antibodies have been observed to
                          have dissociation constants in the nanomolar range
                          <sup>44</sup>. It was found that nanobodies that have
                          undergone affinity maturation{' '}
                          <em>in&nbsp;vitro</em> have dissociation constants in
                          the femtomolar range<sup>46</sup>, which is much
                          smaller than natural antibodies. This means that
                          nanobodies bind more than conventional antibodies at
                          relatively lower concentrations.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>

                {/* ---------- Conclusion Section ---------- */}
                <div id="Conclusion">
                  <h2 style={{ marginTop: '2em' }} id="section5">
                    Conclusion
                  </h2>
                  <hr className="custom-hr" />

                  <p>
                    Nanobodies offer significant advantages over conventional
                    antibodies, such as high stability, low immunogenicity and
                    deep penetration in tissues. Unlike traditional methods of
                    nanobody development that rely on animal immunisation and
                    are often slow, costly, and limited by the need for
                    specialised equipment, A.L.P.A.C.A. would be faster,
                    cheaper, and animal‑free.
                  </p>
                  <br />
                  <p>
                    By using <strong>yeast surface display</strong>,{' '}
                    <strong>synthetic libraries</strong>, and{' '}
                    <strong>steric hindrance</strong>, we can develop a faster,
                    cost‑effective, and animal‑free pipeline for nanobody
                    development. We designed a bispecific nanobody system for
                    efficient nanobody screening and selection, removing the
                    need for antigen tagging. By eliminating the inefficiencies
                    of current methods, we aim to contribute to the future of
                    nanobody‑based therapeutic and diagnostic innovations,
                    driving further advancements in the field.
                  </p>
                  <br />
                  <p>
                    For a closer look at our experimental results, visit our{' '}
                    <Link to="/results" className="link-animated-underline">
                      Results page
                    </Link>{' '}
                    and{' '}
                    <Link to="/model" className="link-animated-underline">
                      Modelling page
                    </Link>
                    , or view our discussions with various experts on the{' '}
                    <Link
                      to="/human-practices"
                      className="link-animated-underline"
                    >
                      Integrated HP page
                    </Link>
                    . Explore our{' '}
                    <Link
                      to="/entrepreneurship"
                      className="link-animated-underline"
                    >
                      Entrepreneurship page
                    </Link>{' '}
                    for insight into our future project development, and find
                    out more about the benefits of cheaper nanobodies on our{' '}
                    <Link
                      to="/sustainable-development"
                      className="link-animated-underline"
                    >
                      Sustainable Development Page
                    </Link>
                    .
                  </p>

                  <p style={{ fontSize: '0.6em', marginTop: '2em' }}>
                    NANOBODY is a registered trademark of AblynxN.V.
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
